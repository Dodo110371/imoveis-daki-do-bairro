import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { guessMimeTypeFromFileName } from "@/lib/utils";

function extractBearerToken(request: Request): string | null {
  const header = request.headers.get("authorization") || request.headers.get("Authorization");
  if (!header) return null;
  const value = header.trim();
  if (!value.toLowerCase().startsWith("bearer ")) return null;
  return value.slice(7).trim() || null;
}

export async function GET(request: Request) {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.json({
      serviceRoleConfigured: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const token = extractBearerToken(request);
    if (!token || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const supabaseAdmin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.json({
    serviceRoleConfigured: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  let resolvedUserId = user?.id || null;
  if (!resolvedUserId) {
    const token = extractBearerToken(request);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    resolvedUserId = data.user.id;
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const providedContentType = formData.get("contentType");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  const contentType =
    (typeof providedContentType === "string" && providedContentType) ||
    file.type ||
    guessMimeTypeFromFileName(file.name);

  if (!contentType || !contentType.startsWith("image/")) {
    return NextResponse.json({ error: "Invalid image type" }, { status: 415 });
  }

  const fileExt = (file.name.split(".").pop() || "bin").toLowerCase();
  const normalizedContentType = contentType.toLowerCase();
  const isHeic =
    normalizedContentType === "image/heic" ||
    normalizedContentType === "image/heif" ||
    fileExt === "heic" ||
    fileExt === "heif";

  if (isHeic) {
    return NextResponse.json(
      { error: "HEIC/HEIF images are not supported. Use JPEG or PNG." },
      { status: 415 }
    );
  }
  const path = `${resolvedUserId}/${Date.now()}-${crypto.randomUUID()}.${fileExt}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from("properties")
    .upload(path, file, { upsert: false, contentType });

  if (uploadError) {
    const rawStatusCode = (uploadError as { statusCode?: unknown }).statusCode;
    const statusCode =
      typeof rawStatusCode === "number"
        ? rawStatusCode
        : typeof rawStatusCode === "string"
          ? Number(rawStatusCode)
          : undefined;

    return NextResponse.json(
      { error: uploadError.message, statusCode: uploadError.statusCode },
      { status: Number.isFinite(statusCode) ? statusCode : 400 }
    );
  }

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from("properties").getPublicUrl(path);

  return NextResponse.json({ publicUrl, path });
}
