import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const daysParam = Number(searchParams.get("days") || "7");
  const days = [7, 14, 30].includes(daysParam) ? daysParam : 7;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const now = new Date();
  const since = new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();

  const { count: pendingProperties } = await supabase
    .from("properties")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  const { count: recentLeads } = await supabase
    .from("analytics_events")
    .select("*", { count: "exact", head: true })
    .in("event_type", ["lead_contact"])
    .gte("created_at", since);

  const { count: users } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .gte("created_at", since);

  return NextResponse.json({
    pendingProperties: pendingProperties ?? 0,
    recentLeads: recentLeads ?? 0,
    users: users ?? 0,
  });
}
