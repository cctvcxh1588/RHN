import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

type Entry = {
  teamName: string;
  raceClass: string;
  sailNumber?: string;
  loa?: string;
  hullColor?: string;
  skipperName: string;
  email: string;
  phone: string;
  country?: string;
  crewCount?: string;
  hasInsurance: boolean;
  hasSafety: boolean;
  notes?: string;
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

async function persistEntry(record: Record<string, unknown>) {
  // Persist to a writable location. Prefer /tmp (works both dev + prod).
  const dir = '/tmp/rhn-entries';
  await fs.mkdir(dir, { recursive: true });
  const file = path.join(dir, 'entries.jsonl');
  await fs.appendFile(file, JSON.stringify(record) + '\n', 'utf-8');
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
    const missing = required.filter((k) => !body[k] || String(body[k]).trim() === '');
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

    const entryId = `RHN-${Date.now().toString(36).toUpperCase()}`;
    const record = {
      entryId,
      submittedAt: new Date().toISOString(),
      ...body,
    };
    await persistEntry(record);

    return NextResponse.json({ ok: true, entryId });
  } catch (err) {
    console.error('register error', err);
    return NextResponse.json(
      { ok: false, error: 'SERVER_ERROR' },
      { status: 500 },
    );
  }
}

export async function GET() {
  // Simple ping — do NOT return submitted records for privacy.
  return NextResponse.json({ ok: true, service: 'rhn-register' });
}
