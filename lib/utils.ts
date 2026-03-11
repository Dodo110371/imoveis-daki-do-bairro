import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyInput(value: string | number): string {
  if (!value) return '';
  
  // Remove non-digits
  const numericValue = value.toString().replace(/\D/g, '');
  
  if (!numericValue) return '';
  
  // Convert to number and divide by 100
  const floatValue = parseFloat(numericValue) / 100;
  
  // Format number part only (e.g. 1.234,56)
  return floatValue.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function parseCurrency(value: string): number {
  if (!value) return 0;
  // Remove all non-digits except comma
  // Then replace comma with dot
  return parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function guessMimeTypeFromFileName(fileName: string): string | undefined {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (!ext) return undefined;

  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    case "avif":
      return "image/avif";
    case "heic":
      return "image/heic";
    case "heif":
      return "image/heif";
    case "svg":
      return "image/svg+xml";
    case "mp4":
      return "video/mp4";
    case "webm":
      return "video/webm";
    case "mov":
      return "video/quicktime";
    case "m4v":
      return "video/x-m4v";
    case "pdf":
      return "application/pdf";
    default:
      return undefined;
  }
}

function encodeStoragePath(path: string): string {
  return path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

export async function uploadToSupabaseStorageViaFetch(params: {
  supabaseUrl: string;
  anonKey: string;
  accessToken: string;
  bucket: string;
  path: string;
  file: Blob;
  contentType: string;
  upsert?: boolean;
  signal?: AbortSignal;
}): Promise<void> {
  const url = `${params.supabaseUrl}/storage/v1/object/${encodeURIComponent(params.bucket)}/${encodeStoragePath(params.path)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      apikey: params.anonKey,
      authorization: `Bearer ${params.accessToken}`,
      "content-type": params.contentType,
      "x-upsert": params.upsert ? "true" : "false",
    },
    body: params.file,
    signal: params.signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(text || `UPLOAD_FAILED_${res.status}`);
    (err as any).statusCode = res.status;
    throw err;
  }
}
