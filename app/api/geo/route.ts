import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://ipapi.co/json/', { cache: 'no-store' });
    if (!res.ok) throw new Error('Geo provider unavailable');
    const data = await res.json();
    const countryCode = data?.country || null; // e.g., "US"
    const countryName = data?.country_name || null; // e.g., "United States"
    return NextResponse.json({ countryCode, countryName });
  } catch (e) {
    return NextResponse.json({ countryCode: null, countryName: null }, { status: 200 });
  }
}


