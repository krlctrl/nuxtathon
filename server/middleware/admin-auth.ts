import { createHash, timingSafeEqual } from "node:crypto";

const WINDOW_MS = 60_000;
const MAX_FAILURES = 10;

// Per-IP failure throttle. In-memory is fine on a single instance.
const attempts = new Map<string, { count: number; resetAt: number }>();

// Hash to a fixed length so timingSafeEqual gets equal-size buffers and the
// comparison leaks neither length nor content.
const sha256 = (value: string) => createHash("sha256").update(value).digest();
const safeEqual = (a: string, b: string) => timingSafeEqual(sha256(a), sha256(b));

function overLimit(ip: string): boolean {
  const rec = attempts.get(ip);
  if (!rec || Date.now() > rec.resetAt) return false;
  return rec.count >= MAX_FAILURES;
}
function recordFailure(ip: string): void {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || now > rec.resetAt) attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  else rec.count += 1;
}

// HTTP Basic Auth for the admin API. Credentials come from env
// (NUXT_ADMIN_USER / NUXT_ADMIN_PASSWORD). Only safe over HTTPS, since Basic Auth
// sends the credentials base64-encoded (not encrypted).
export default defineEventHandler((event) => {
  if (!event.path.startsWith("/api/admin")) return;

  const { adminUser, adminPassword } = useRuntimeConfig();
  if (!adminUser || !adminPassword) {
    throw createError({ statusCode: 503, statusMessage: "Admin credentials not configured" });
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) ?? "unknown";
  if (overLimit(ip)) {
    throw createError({ statusCode: 429, statusMessage: "Too many attempts, slow down" });
  }

  const [scheme, encoded] = (getHeader(event, "authorization") ?? "").split(" ");
  if (scheme === "Basic" && encoded) {
    const decoded = Buffer.from(encoded, "base64").toString();
    if (safeEqual(decoded, `${adminUser}:${adminPassword}`)) {
      attempts.delete(ip);
      return;
    }
  }

  recordFailure(ip);
  throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
});
