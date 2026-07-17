import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/storage/database/supabase-client";

function verifyAdmin(request: Request): boolean {
  const auth = request.headers.get("authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "");
  const expected = process.env.RHN_ADMIN_TOKEN || "rhn-2026-admin";
  return token === expected;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const auth = request.headers.get("authorization") || "";
    const token = auth.replace(/^Bearer\s+/i, "") || searchParams.get("token");
    const expected = process.env.RHN_ADMIN_TOKEN || "rhn-2026-admin";
    const isAdmin = token === expected;

    const supabase = getSupabaseClient();
    let query = supabase.from("cms_classes").select("*").order("sort_order", { ascending: true });
    if (!isAdmin) {
      query = query.eq("is_published", true);
    }
    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ ok: true, count: data?.length ?? 0, items: data ?? [] });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "SERVER_ERROR" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from("cms_classes").insert(body).select().single();
    if (error) throw error;
    return NextResponse.json({ ok: true, item: data });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "SERVER_ERROR" }, { status: 500 });
  }
}
