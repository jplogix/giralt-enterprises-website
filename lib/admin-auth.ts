import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const SESSION_COOKIE_NAME = "admin_session";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export function verifyPassword(password: string): boolean {
	return password === ADMIN_PASSWORD;
}

export function createSession(): string {
	const sessionToken = generateSessionToken();
	return sessionToken;
}

export async function setSessionCookie(sessionToken: string): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: SESSION_DURATION / 1000,
		path: "/",
	});
}

export async function getSessionToken(): Promise<string | null> {
	const cookieStore = await cookies();
	return cookieStore.get(SESSION_COOKIE_NAME)?.value || null;
}

export async function clearSession(): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
	const sessionToken = await getSessionToken();
	if (!sessionToken) return false;

	// In a production app, you'd verify the session token against a database
	// For simplicity, we'll just check if the token exists and matches our expected format
	return sessionToken.startsWith("admin_");
}

function generateSessionToken(): string {
	return `admin_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}
