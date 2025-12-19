import { type NextRequest, NextResponse } from "next/server";
import {
	clearSession,
	createSession,
	isAuthenticated,
	setSessionCookie,
	verifyPassword,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { password, action } = body;

		if (action === "login") {
			if (!password) {
				return NextResponse.json(
					{ error: "Password is required" },
					{ status: 400 },
				);
			}

			if (!verifyPassword(password)) {
				return NextResponse.json(
					{ error: "Invalid password" },
					{ status: 401 },
				);
			}

			const sessionToken = createSession();
			await setSessionCookie(sessionToken);

			return NextResponse.json({ success: true });
		}

		if (action === "logout") {
			await clearSession();
			return NextResponse.json({ success: true });
		}

		if (action === "check") {
			const authenticated = await isAuthenticated();
			return NextResponse.json({ authenticated });
		}

		return NextResponse.json({ error: "Invalid action" }, { status: 400 });
	} catch (error) {
		console.error("Auth error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
