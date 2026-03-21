import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type Payload = {
  eventType?: unknown;
  propertyId?: unknown;
  contactChannel?: unknown;
  contactValue?: unknown;
  path?: unknown;
};

const allowedEventTypes = new Set(["click_imovel", "lead_whatsapp", "lead_contact"]);

export async function POST(request: Request) {
  const supabase = await createClient();

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  let payload: Payload;
  try {
    payload = JSON.parse(raw) as Payload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const eventType = typeof payload.eventType === "string" ? payload.eventType : "";
  if (!allowedEventTypes.has(eventType)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const propertyId = typeof payload.propertyId === "string" ? payload.propertyId : null;
  const contactChannel = typeof payload.contactChannel === "string" ? payload.contactChannel : null;
  const contactValue = typeof payload.contactValue === "string" ? payload.contactValue : null;
  const path = typeof payload.path === "string" ? payload.path : null;

  const { data: { user } } = await supabase.auth.getUser();

  const insertBase: Record<string, unknown> = {
    event_type: eventType,
    user_id: user?.id || null,
    property_id: propertyId,
    path,
  };

  const insertWithContact: Record<string, unknown> = {
    ...insertBase,
    contact_channel: contactChannel,
    contact_value: contactValue,
  };

  const { error } = await supabase.from("analytics_events").insert(insertWithContact);
  if (!error) {
    return NextResponse.json({ ok: true });
  }

  const msg = String(error.message || "");
  if (msg.includes("contact_channel") || msg.includes("contact_value")) {
    await supabase.from("analytics_events").insert(insertBase);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false }, { status: 200 });
}

