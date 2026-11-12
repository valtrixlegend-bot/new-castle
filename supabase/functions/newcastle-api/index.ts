// Newcastle School — GitHub Pages statik sayti uchun API (Supabase Edge Function).
// Manzillar: GET/HEAD/PUT /newcastle-api/db,  GET/HEAD /newcastle-api/health
// Baza: public.app_state (id = 'main'). RLS anon/authenticated uchun yopiq,
// shuning uchun funksiya faqat service_role kaliti orqali ishlaydi.
// Birinchi GET so'rovida baza bo'sh bo'lsa, GitHub Pages'dagi demo-data.json'dan
// avtomatik nusxa olinadi.

const STATE_ID = "main";
const MAX_BODY_SIZE = 4 * 1024 * 1024;
const SEED_URL = "https://valtrixlegend-bot.github.io/new-castle/data/demo-data.json";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, PUT, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Max-Age": "86400",
};

const COLLECTIONS = [
  "users",
  "homework",
  "submissions",
  "grades",
  "examTopics",
  "shopItems",
  "purchases",
  "groups",
  "payments",
  "paymentRequests",
  "supportSlots",
  "mainAttendance",
  "notifications",
  "messages",
];

class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function config() {
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) {
    throw new HttpError(503, "Supabase sozlamalari serverda kiritilmagan");
  }
  return { url: url.replace(/\/$/, ""), key };
}

async function supabase(pathname: string, options: RequestInit = {}) {
  const { url, key } = config();
  let response: Response;
  try {
    response = await fetch(`${url}/rest/v1/${pathname}`, {
      ...options,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        ...((options.headers as Record<string, string>) || {}),
      },
    });
  } catch {
    throw new HttpError(502, "Doimiy bazaga ulanib bo'lmadi");
  }

  if (!response.ok) {
    const details = await response.text();
    console.error("Supabase API xatosi:", response.status, details.slice(0, 500));
    throw new HttpError(502, "Doimiy baza so'rovini bajarib bo'lmadi");
  }
  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

function normalizeDB(value: any) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new HttpError(400, "Baza obyekt bo'lishi kerak");
  }
  if (!Array.isArray(value.users)) {
    throw new HttpError(400, "Bazada users ro'yxati topilmadi");
  }
  for (const key of COLLECTIONS) {
    if (value[key] === undefined || value[key] === null) value[key] = [];
    if (!Array.isArray(value[key])) {
      throw new HttpError(400, `${key} ro'yxat bo'lishi kerak`);
    }
  }
  return value;
}

async function fetchSeed() {
  let response: Response;
  try {
    response = await fetch(SEED_URL);
  } catch {
    throw new HttpError(502, "Demo bazani yuklab bo'lmadi");
  }
  if (!response.ok) {
    throw new HttpError(502, "Demo bazani yuklab bo'lmadi");
  }
  try {
    return normalizeDB(await response.json());
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(502, "Demo baza formati noto'g'ri");
  }
}

async function readState() {
  const rows = await supabase(`app_state?id=eq.${STATE_ID}&select=payload`);
  if (rows.length) return rows[0].payload;

  // Birinchi marta ochilganda demo bazani doimiy bazaga nusxalaymiz.
  const seed = await fetchSeed();
  await supabase("app_state", {
    method: "POST",
    headers: { Prefer: "resolution=ignore-duplicates,return=minimal" },
    body: JSON.stringify({ id: STATE_ID, payload: seed }),
  });
  const seeded = await supabase(`app_state?id=eq.${STATE_ID}&select=payload`);
  if (!seeded.length) throw new HttpError(500, "Boshlang'ich baza yaratib bo'lmadi");
  return seeded[0].payload;
}

async function writeState(payload: any) {
  await supabase("app_state", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({
      id: STATE_ID,
      payload,
      updated_at: new Date().toISOString(),
    }),
  });
}

async function checkState() {
  await supabase("app_state?select=id&limit=1");
}

function sendJSON(value: unknown, status = 200, method = "GET") {
  const headers = new Headers({
    ...CORS_HEADERS,
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  if (method === "HEAD") return new Response(null, { status, headers });
  return new Response(JSON.stringify(value), { status, headers });
}

function handleError(error: any, method: string) {
  const status = error instanceof HttpError ? error.status : error?.status || 500;
  if (status >= 500) console.error("API xatosi:", error?.message || error);
  return sendJSON({ ok: false, error: error?.message || "Server xatosi" }, status, method);
}

async function handleDB(req: Request) {
  if (req.method === "GET" || req.method === "HEAD") {
    const payload = await readState();
    return sendJSON({ payload: JSON.stringify(payload) }, 200, req.method);
  }

  if (req.method === "PUT") {
    const raw = await req.text();
    if (raw.length > MAX_BODY_SIZE) {
      throw new HttpError(413, "So'rov hajmi 4 MB dan oshmasligi kerak");
    }
    let body: any;
    try {
      body = JSON.parse(raw);
    } catch {
      throw new HttpError(400, "So'rov JSON formatida bo'lishi kerak");
    }
    if (!body || typeof body.payload !== "string") {
      throw new HttpError(400, "payload matn ko'rinishida yuborilishi kerak");
    }
    let parsed: any;
    try {
      parsed = JSON.parse(body.payload);
    } catch {
      throw new HttpError(400, "payload ichidagi baza JSON formati noto'g'ri");
    }
    const normalized = normalizeDB(parsed);
    await writeState(normalized);
    return sendJSON({ ok: true }, 200, req.method);
  }

  const res = sendJSON({ ok: false, error: "Metod ruxsat etilmagan" }, 405, req.method);
  res.headers.set("Allow", "GET, HEAD, PUT");
  return res;
}

async function handleHealth(req: Request) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    const res = sendJSON({ ok: false, error: "Metod ruxsat etilmagan" }, 405, req.method);
    res.headers.set("Allow", "GET, HEAD");
    return res;
  }
  await checkState();
  return sendJSON({ ok: true, service: "newcastle-school", storage: "supabase" }, 200, req.method);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  try {
    const pathname = new URL(req.url).pathname;
    const subpath = pathname.replace(/^\/?newcastle-api\/?/, "/").replace(/\/+$/, "") || "/";
    if (subpath === "/db") return await handleDB(req);
    if (subpath === "/health") return await handleHealth(req);
    return sendJSON({ ok: false, error: "Manzil topilmadi" }, 404, req.method);
  } catch (error) {
    return handleError(error, req.method);
  }
});
