import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function bytesToMb(bytes: number) {
  const ONE_MB_IN_BYTES = 1024 * 1024;

  return (bytes / ONE_MB_IN_BYTES).toFixed(2);
}
