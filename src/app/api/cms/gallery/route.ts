import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/storage/database/supabase-client";

const ADMIN_TOKEN = process.env.RHN_ADMIN_TOKEN || "rhn-2026-admin";

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization") || "";
  const token = auth.replace("Bearer ", "");
  const queryToken = req.nextUrl.searchParams.get("token");
  return token === ADMIN_TOKEN || queryToken === ADMIN_TOKEN;
}

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    const published = request.nextUrl.searchParams.get("published");
    let query = supabase.from("cms_gallery").select("*").order("sort_order", { ascending: true });

    if (published === "true") {
      query = query.eq("is_published", true);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ ok: false, error: "DB_ERROR", detail: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, count: data?.length || 0, items: data || [] });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "SERVER_ERROR", detail: String(err) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseClient();
    const body = await request.json();
    const { src, alt, category, sort_order } = body;

    if (!src) {
      return NextResponse.json({ ok: false, error: "MISSING_SRC", detail: "Image URL is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("cms_gallery")
      .insert({ src, alt: alt || "", category: category || "general", sort_order: sort_order || 0 })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ ok: false, error: "DB_ERROR", detail: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, item: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "SERVER_ERROR", detail: String(err) }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseClient();
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ ok: false, error: "MISSING_ID" }, { status: 400 });
    }

    const body = await request.json();
    const updates: Record<string, unknown> = {};
    if (body.alt !== undefined) updates.alt = body.alt;
    if (body.category !== undefined) updates.category = body.category;
    if (body.sort_order !== undefined) updates.sort_order = body.sort_order;
    if (body.src !== undefined) updates.src = body.src;
    if (body.is_published !== undefined) updates.is_published = body.is_published;

    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("cms_gallery")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ ok: false, error: "DB_ERROR", detail: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, item: data });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "SERVER_ERROR", detail: String(err) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseClient();
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ ok: false, error: "MISSING_ID" }, { status: 400 });
    }

    const { error } = await supabase.from("cms_gallery").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ ok: false, error: "DB_ERROR", detail: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "SERVER_ERROR", detail: String(err) }, { status: 500 });
  }
}