import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/storage/database/supabase-client";

const ADMIN_TOKEN = process.env.RHN_ADMIN_TOKEN || "rhn-2026-admin";

function checkAuth(request: NextRequest): boolean {
	const auth = request.headers.get("authorization") || "";
	const token = auth.replace(/^Bearer\s+/i, "").trim();
	const queryToken = new URL(request.url).searchParams.get("token") || "";
	return token === ADMIN_TOKEN || queryToken === ADMIN_TOKEN;
}

// GET /api/cms/settings · public list all settings
export async function GET() {
	const supabase = getSupabaseClient();
	const { data, error } = await supabase.from("cms_settings").select("*").order("key");
	if (error) {
		return NextResponse.json({ ok: false, error: "DB_ERROR", detail: error.message }, { status: 500 });
	}
	return NextResponse.json({ ok: true, items: data || [] });
}

// PATCH /api/cms/settings · admin only, bulk upsert
export async function PATCH(request: NextRequest) {
	if (!checkAuth(request)) {
		return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
	}

	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
	}

	const items = body.items;
	if (!Array.isArray(items) || items.length === 0) {
		return NextResponse.json({ ok: false, error: "EMPTY_ITEMS" }, { status: 400 });
	}

	const now = new Date().toISOString();
	const rows = items
		.filter((it): it is Record<string, unknown> => typeof it === "object" && it !== null)
		.map((it) => ({
			key: String(it.key || "").trim(),
			value_en: it.value_en == null ? null : String(it.value_en),
			value_zh: it.value_zh == null ? null : String(it.value_zh),
			description: it.description == null ? null : String(it.description),
			updated_at: now,
		}))
		.filter((r) => r.key.length > 0);

	if (rows.length === 0) {
		return NextResponse.json({ ok: false, error: "NO_VALID_ROWS" }, { status: 400 });
	}

	const supabase = getSupabaseClient();
	const { data, error } = await supabase
		.from("cms_settings")
		.upsert(rows, { onConflict: "key" })
		.select();

	if (error) {
		return NextResponse.json({ ok: false, error: "DB_ERROR", detail: error.message }, { status: 500 });
	}
	return NextResponse.json({ ok: true, count: data?.length || 0, items: data || [] });
}
