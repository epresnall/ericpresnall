// Tiny password gate for the cockpit. The login route sets a cookie whose value
// is sha256(password); the proxy (middleware) checks it matches sha256(DASHBOARD_PASSWORD).
// Uses Web Crypto so it runs in both the Edge proxy and Node route handlers.

export const COOKIE_NAME = "cockpit_auth";

// Default password for preview if none configured. Eric should set DASHBOARD_PASSWORD
// in Vercel env. Without an API key, generation is MOCK-only, so exposure is low-risk.
export function dashboardPassword(): string {
  return process.env.DASHBOARD_PASSWORD || "cockpit";
}

export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function expectedToken(): Promise<string> {
  return sha256Hex(dashboardPassword());
}

export async function isAuthed(cookieValue: string | undefined): Promise<boolean> {
  if (!cookieValue) return false;
  return cookieValue === (await expectedToken());
}
