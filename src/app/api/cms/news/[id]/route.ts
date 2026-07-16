import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/storage/database/supabase-client";

const ADMIN_TOKEN = process.env.RHN_ADMIN_TOKEN || "rhn-2026-admin";

function checkAuth(request: NextRequest): boolean {
	const auth = request.headers.get("authorization") || "";
	const token = auth.replace(/^Bearer\s+/i, "").trim();
	const queryToken = new URL(request.url).searchParams.get("token") || "";
	return token === ADMIN_TOKEN || queryToken === ADMIN_TOKEN;
}

type CtxParams = { params: Promise<{ id: string }> };

// GET /api/cms/news/:id · fetch a single news article by id or slug
export async function GET(request: NextRequest, ctx: CtxParams) {
	const { id } = await ctx.params;
	const isAdmin = checkAuth(request);
	const supabase = getSupabaseClient();

	const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
	let query = supabase.from("cms_news").select("*").limit(1);
	query = isUuid ? query.eq("id", id) : query.eq("slug", id);
	if (!isAdmin) query = query.eq("is_published", true);

	const { data, error } = await query.maybeSingle();

	if (error) {
		return NextResponse.json({ ok: false, error: "DB_ERROR", detail: error.message }, { status: 500 });
	}
	if (!data) {
		return NextResponse.json({ ok: false, error: "NOT_FOUND" }, { status: 404 });
	}
	return NextResponse.json({ ok: true, item: data });
}

// PATCH /api/cms/news/:id · admin only, update article
export async function PATCH(request: NextRequest, ctx: CtxParams) {
	if (!checkAuth(request)) {
		return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
	}
	const { id } = await ctx.params;

	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
	}

	const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
	const allowed = ["slug", "title_en", "title_zh", "category", "published_at", "image_url", "excerpt_en", "excerpt_zh", "body_en", "body_zh", "is_published", "sort_order"];
	for (const k of allowed) {
		if (k in body) update[k] = body[k];
	}

	if ("slug" in update && update.slug && !/^[a-z0-9-]+$/.test(String(update.slug))) {
		return NextResponse.json({ ok: false, error: "INVALID_SLUG" }, { status: 400 });
	}

	const supabase = getSupabaseClient();
	const { data, error } = await supabase
		.from("cms_news")
		.update(update)
		.eq("id", id)
		.select()
		.single();

	if (error) {
		const isDup = /duplicate key|unique constraint/i.test(error.message);
		return NextResponse.json({ ok: false, error: isDup ? "DUPLICATE_SLUG" : "DB_ERROR", detail: error.message }, { status: isDup ? 409 : 500 });
	}
	if (!data) {
		return NextResponse.json({ ok: false, error: "NOT_FOUND" }, { status: 404 });
	}
	return NextResponse.json({ ok: true, item: data });
}

// DELETE /api/cms/news/:id · admin only
export async function DELETE(request: NextRequest, ctx: CtxParams) {
	if (!checkAuth(request)) {
		return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
	}
	const { id } = await ctx.params;
	const supabase = getSupabaseClient();

	const { error } = await supabase.from("cms_news").delete().eq("id", id);

	if (error) {
		return NextResponse.json({ ok: false, error: "DB_ERROR", detail: error.message }, { status: 500 });
	}
	return NextResponse.json({ ok: true });
}
