import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { guessMimeTypeFromFileName } from "@/lib/utils";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
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
  const path = `${user.id}/${Date.now()}-${crypto.randomUUID()}.${fileExt}`;

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

  const { error: uploadError } = await supabaseAdmin.storage
    .from("properties")
    .upload(path, file, { upsert: false, contentType });

  if (uploadError) {
    const rawStatusCode = (uploadError as any).statusCode as unknown;
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
