import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/storage/database/supabase-client';

type Entry = {
  teamName: string;
  raceClass: string;
  mmsi?: string;
  loa?: string;
  skipperName: string;
  email: string;
  phone: string;
  country?: string;
  crewCount?: string;
  hasInsurance: boolean;
  hasSafety: boolean;
  notes?: string;
  lang?: string;
};

const RACE_CLASSES = [
  'Dubois 50 Class',
  'ORC Full Round Class',
  'ORC Half Round Class',
  'Fareast 28R Class',
];

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function generateEntryId(): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.floor(Math.random() * 36 * 36)
    .toString(36)
    .toUpperCase()
    .padStart(2, '0');
  return `RHN-${stamp}${rand}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<Entry>;

    // Validate required fields
    const required: Array<keyof Entry> = [
      'teamName',
      'raceClass',
      'skipperName',
      'email',
      'phone',
    ];
    const missing = required.filter(
      (k) => !body[k] || String(body[k]).trim() === '',
    );
    if (missing.length > 0) {
      return NextResponse.json(
        { ok: false, error: 'MISSING_FIELDS', missing },
        { status: 400 },
      );
    }
    if (!isValidEmail(String(body.email))) {
      return NextResponse.json(
        { ok: false, error: 'INVALID_EMAIL' },
        { status: 400 },
      );
    }
    if (!RACE_CLASSES.includes(String(body.raceClass))) {
      return NextResponse.json(
        { ok: false, error: 'INVALID_CLASS' },
        { status: 400 },
      );
    }
    if (!body.hasInsurance || !body.hasSafety) {
      return NextResponse.json(
        { ok: false, error: 'CONFIRMATIONS_REQUIRED' },
        { status: 400 },
      );
    }

    const client = getSupabaseClient();
    const entryId = generateEntryId();
    const insertPayload = {
      entry_id: entryId,
      team_name: String(body.teamName).trim(),
      race_class: String(body.raceClass),
      skipper_name: String(body.skipperName).trim(),
      email: String(body.email).trim().toLowerCase(),
      phone: String(body.phone).trim(),
      country: body.country ? String(body.country).trim() : null,
      crew_count: body.crewCount ? String(body.crewCount).trim() : null,
      mmsi: body.mmsi ? String(body.mmsi).trim() : null,
      loa: body.loa ? String(body.loa).trim() : null,
      notes: body.notes ? String(body.notes).trim() : null,
      has_insurance: !!body.hasInsurance,
      has_safety: !!body.hasSafety,
      status: 'pending',
      lang: body.lang === 'zh' ? 'zh' : 'en',
    };

    const { data, error } = await client
      .from('registrations')
      .insert(insertPayload)
      .select('entry_id, created_at')
      .maybeSingle();

    if (error) {
      console.error('supabase insert error', error);
      return NextResponse.json(
        { ok: false, error: 'DB_ERROR', message: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      entryId: data?.entry_id ?? entryId,
      submittedAt: data?.created_at,
    });
  } catch (err) {
    console.error('register error', err);
    return NextResponse.json(
      { ok: false, error: 'SERVER_ERROR' },
      { status: 500 },
    );
  }
}

// GET is used both as a health probe and (with admin token) as a list endpoint.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const adminToken = process.env.RHN_ADMIN_TOKEN || 'rhn-2026-admin';

  if (!token) {
    return NextResponse.json({ ok: true, service: 'rhn-register' });
  }

  if (token !== adminToken) {
    return NextResponse.json(
      { ok: false, error: 'UNAUTHORIZED' },
      { status: 401 },
    );
  }

  try {
    const client = getSupabaseClient();
    const raceClass = searchParams.get('race_class');
    const status = searchParams.get('status');
    const limit = Math.min(Number(searchParams.get('limit')) || 200, 500);

    let query = client
      .from('registrations')
      .select(
        'id, entry_id, team_name, race_class, skipper_name, email, phone, country, crew_count, mmsi, loa, has_insurance, has_safety, status, lang, notes, created_at',
      )
      .order('created_at', { ascending: false })
      .limit(limit);

    if (raceClass) query = query.eq('race_class', raceClass);
    if (status) query = query.eq('status', status);

    const { data, error, count } = await query;
    if (error) {
      return NextResponse.json(
        { ok: false, error: 'DB_ERROR', message: error.message },
        { status: 500 },
      );
    }

    const { count: total } = await client
      .from('registrations')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      ok: true,
      total: total ?? count ?? data?.length ?? 0,
      count: data?.length ?? 0,
      entries: data ?? [],
    });
  } catch (err) {
    console.error('register list error', err);
    return NextResponse.json(
      { ok: false, error: 'SERVER_ERROR' },
      { status: 500 },
    );
  }
}
