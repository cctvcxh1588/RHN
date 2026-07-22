import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/storage/database/supabase-client";

const ADMIN_TOKEN = process.env.RHN_ADMIN_TOKEN || "rhn-2026-admin";

function checkAuth(request: NextRequest): boolean {
	const auth = request.headers.get("authorization") || "";
	const token = auth.replace(/^Bearer\s+/i, "").trim();
	const queryToken = new URL(request.url).searchParams.get("token") || "";
	return token === ADMIN_TOKEN || queryToken === ADMIN_TOKEN;
}

// GET /api/cms/contact · public list all contact sections
export async function GET() {
	const supabase = getSupabaseClient();
	const { data, error } = await supabase
		.from("cms_contact")
		.select("*")
		.eq("is_published", true)
		.order("sort_order");
	if (error) {
		return NextResponse.json({ ok: false, error: "DB_ERROR", detail: error.message }, { status: 500 });
	}
	return NextResponse.json({ ok: true, items: data || [] });
}

// PATCH /api/cms/contact · admin only, bulk upsert
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
			id: it.id ? String(it.id) : undefined,
			section: String(it.section || "").trim(),
			title_en: it.title_en == null ? null : String(it.title_en),
			title_zh: it.title_zh == null ? null : String(it.title_zh),
			content_en: it.content_en == null ? null : String(it.content_en),
			content_zh: it.content_zh == null ? null : String(it.content_zh),
			email: it.email == null ? null : String(it.email),
			phone: it.phone == null ? null : String(it.phone),
			address_en: it.address_en == null ? null : String(it.address_en),
			address_zh: it.address_zh == null ? null : String(it.address_zh),
			social_links: it.social_links || null,
			sort_order: typeof it.sort_order === "number" ? it.sort_order : 0,
			is_published: it.is_published === false ? false : true,
			updated_at: now,
		}))
		.filter((r) => r.section.length > 0);

	if (rows.length === 0) {
		return NextResponse.json({ ok: false, error: "NO_VALID_ROWS" }, { status: 400 });
	}

	const supabase = getSupabaseClient();
	const { data, error } = await supabase
		.from("cms_contact")
		.upsert(rows, { onConflict: "id" })
		.select();

	if (error) {
		return NextResponse.json({ ok: false, error: "DB_ERROR", detail: error.message }, { status: 500 });
	}
	return NextResponse.json({ ok: true, count: data?.length || 0, items: data || [] });
}
