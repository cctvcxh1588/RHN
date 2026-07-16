import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/storage/database/supabase-client";

const ADMIN_TOKEN = process.env.RHN_ADMIN_TOKEN || "rhn-2026-admin";

function checkAuth(request: NextRequest): boolean {
	const auth = request.headers.get("authorization") || "";
	const token = auth.replace(/^Bearer\s+/i, "").trim();
	const queryToken = new URL(request.url).searchParams.get("token") || "";
	return token === ADMIN_TOKEN || queryToken === ADMIN_TOKEN;
}

// GET /api/cms/news · public list published, admin sees all
export async function GET(request: NextRequest) {
	const supabase = getSupabaseClient();
	const url = new URL(request.url);
	const isAdmin = checkAuth(request);
	const limit = Math.min(parseInt(url.searchParams.get("limit") || "50", 10) || 50, 200);

	let query = supabase
		.from("cms_news")
		.select("*")
		.order("published_at", { ascending: false })
		.limit(limit);

	if (!isAdmin) {
		query = query.eq("is_published", true);
	}

	const { data, error } = await query;

	if (error) {
		return NextResponse.json({ ok: false, error: "DB_ERROR", detail: error.message }, { status: 500 });
	}

	return NextResponse.json({ ok: true, count: data?.length || 0, items: data || [] });
}

// POST /api/cms/news · admin only, create a news article
export async function POST(request: NextRequest) {
	if (!checkAuth(request)) {
		return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
	}

	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
	}

	const slug = String(body.slug || "").trim();
	const titleEn = String(body.title_en || "").trim();
	if (!slug) {
		return NextResponse.json({ ok: false, error: "MISSING_SLUG" }, { status: 400 });
	}
	if (!titleEn) {
		return NextResponse.json({ ok: false, error: "MISSING_TITLE" }, { status: 400 });
	}
	if (!/^[a-z0-9-]+$/.test(slug)) {
		return NextResponse.json({ ok: false, error: "INVALID_SLUG", detail: "lowercase letters, digits, hyphens only" }, { status: 400 });
	}

	const supabase = getSupabaseClient();
	const now = new Date().toISOString();

	const insertPayload = {
		slug,
		title_en: titleEn,
		title_zh: String(body.title_zh || "").trim() || null,
		category: String(body.category || "News").trim() || "News",
		published_at: body.published_at ? String(body.published_at) : now,
		image_url: body.image_url ? String(body.image_url) : null,
		excerpt_en: body.excerpt_en ? String(body.excerpt_en) : null,
		excerpt_zh: body.excerpt_zh ? String(body.excerpt_zh) : null,
		body_en: body.body_en ? String(body.body_en) : null,
		body_zh: body.body_zh ? String(body.body_zh) : null,
		is_published: body.is_published !== false,
		sort_order: typeof body.sort_order === "number" ? body.sort_order : 0,
	};

	const { data, error } = await supabase
		.from("cms_news")
		.insert(insertPayload)
		.select()
		.single();

	if (error) {
		const isDup = /duplicate key|unique constraint/i.test(error.message);
		return NextResponse.json({ ok: false, error: isDup ? "DUPLICATE_SLUG" : "DB_ERROR", detail: error.message }, { status: isDup ? 409 : 500 });
	}

	return NextResponse.json({ ok: true, item: data });
}
