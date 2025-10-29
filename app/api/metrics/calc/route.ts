import { NextRequest } from 'next/server';

const COUNTER_KEY = 'global:calcCount';

function isProd() {
  return process.env.NODE_ENV === 'production';
}

function metricsEnabled() {
  return process.env.METRICS_ENABLED === 'true';
}

function getKvEnv() {
  const vercelUrl = process.env.KV_REST_API_URL;
  const vercelToken = process.env.KV_REST_API_TOKEN;
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (vercelUrl && vercelToken) {
    return { url: vercelUrl, token: vercelToken, provider: 'vercel' as const };
  }
  if (upstashUrl && upstashToken) {
    return { url: upstashUrl, token: upstashToken, provider: 'upstash' as const };
  }
  return null;
}

async function kvGet(key: string): Promise<number> {
  const env = getKvEnv();
  if (!env) return 0;
  // Use Upstash/Vercel KV REST pipeline for GET
  const res = await fetch(`${env.url}/pipeline`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.token}`,
    },
    body: JSON.stringify([['GET', key]]),
    cache: 'no-store',
  });
  if (!res.ok) return 0;
  const data = await res.json();
  const raw = Array.isArray(data) ? data[0] : undefined;
  const value = typeof raw?.result === 'string' ? parseInt(raw.result, 10) : 0;
  return Number.isFinite(value) ? value : 0;
}

async function kvIncr(key: string): Promise<number> {
  const env = getKvEnv();
  if (!env) return 0;
  const res = await fetch(`${env.url}/pipeline`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.token}`,
    },
    body: JSON.stringify([
      ['INCR', key],
      ['GET', key],
    ]),
    cache: 'no-store',
  });
  if (!res.ok) return 0;
  const data = await res.json();
  const getRes = Array.isArray(data) ? data[1] : undefined;
  const value = typeof getRes?.result === 'string' ? parseInt(getRes.result, 10) : 0;
  return Number.isFinite(value) ? value : 0;
}

export async function GET() {
  try {
    const count = await kvGet(COUNTER_KEY);
    return new Response(JSON.stringify({ count }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response(JSON.stringify({ count: 0 }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function POST(req: NextRequest) {
  // Only count in production and when explicitly enabled
  if (!(isProd() && metricsEnabled())) {
    const count = await kvGet(COUNTER_KEY);
    return new Response(JSON.stringify({ count, skipped: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  // Basic IP-based throttle (very light)
  try {
    const count = await kvIncr(COUNTER_KEY);
    return new Response(JSON.stringify({ count }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch {
    const count = await kvGet(COUNTER_KEY);
    return new Response(JSON.stringify({ count }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
}


