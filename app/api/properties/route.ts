import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { parseCurrency } from "@/lib/utils";

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

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;

  const title = String(payload.title || "");
  const description = String(payload.description || "");
  const purpose = String(payload.purpose || "");
  const category = String(payload.category || "");
  const price = parseCurrency(String(payload.price || ""));
  const condoPrice = parseCurrency(String(payload.condoPrice || ""));
  const iptuPrice = parseCurrency(String(payload.iptuPrice || ""));
  const cep = String(payload.cep || "");
  const street = String(payload.street || "");
  const number = String(payload.number || "");
  const complement = String(payload.complement || "");
  const neighborhood = String(payload.neighborhood || "");
  const city = String(payload.city || "");
  const state = String(payload.state || "MA");
  const bedrooms = Number(payload.bedrooms || 0);
  const bathrooms = Number(payload.bathrooms || 0);
  const parking = Number(payload.parking || 0);
  const area = Number(String(payload.area || "").replace(",", ".")) || 0;
  const features = Array.isArray(payload.features) ? payload.features : [];
  const images = Array.isArray(payload.photos) ? payload.photos : [];
  const videoUrl = String(payload.videoUrl || "");
  const contactName = String(payload.contactName || "");
  const contactEmail = String(payload.contactEmail || "");
  const contactPhone = String(payload.contactPhone || "");
  const contactWhatsapp = String(payload.contactWhatsapp || "");

  if (!title || !description || !purpose || !category || !street || !city || !neighborhood) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const type = purpose === "venda" ? "Venda" : "Aluguel";
  const location = `${street}, ${number} - ${neighborhood}, ${city}`;

  const { data, error } = await supabaseAdmin
    .from("properties")
    .insert({
      title,
      description,
      price,
      condo_price: condoPrice,
      iptu_price: iptuPrice,
      location,
      cep,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      bedrooms,
      bathrooms,
      parking,
      area,
      type,
      category,
      features,
      images,
      owner_id: user.id,
      featured: false,
      contact_name: contactName,
      contact_email: contactEmail,
      contact_phone: contactPhone,
      contact_whatsapp: contactWhatsapp,
      status: "pending",
      video_url: videoUrl || null,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message, statusCode: (error as { statusCode?: unknown }).statusCode }, { status: 400 });
  }

  return NextResponse.json({ id: data.id });
}
