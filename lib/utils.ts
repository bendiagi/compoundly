import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Mobile-friendly abbreviation for large numbers used in currency display
// Abbreviates at 10,000,000 and above: 10m, 22b, 1t. Preserves sign.
export function formatAbbrevNumberMobile(value: number, isMobile: boolean): string {
  if (!isFinite(value)) return '0'
  if (!isMobile) return Math.trunc(value).toLocaleString()

  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''

  // Helper for max 2 decimals, no trailing zeros
  const format = (n: number) => {
    if (Math.floor(n) === n) return n.toString();
    return n.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 0 });
  };

  if (abs >= 1_000_000_000_000) {
    const v = abs / 1_000_000_000_000;
    return `${sign}${format(v)}t`
  }
  if (abs >= 1_000_000_000) {
    const v = abs / 1_000_000_000;
    return `${sign}${format(v)}b`
  }
  if (abs >= 10_000_000) {
    const v = abs / 1_000_000;
    return `${sign}${format(v)}m`
  }
  return Math.trunc(value).toLocaleString()
}

export function formatFullNumber(value: number): string {
  if (!isFinite(value)) return '0'
  return Math.trunc(value).toLocaleString()
}
