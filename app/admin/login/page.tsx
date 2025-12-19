"use client";

import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const response = await fetch("/api/admin/auth", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					action: "login",
					password,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || "Login failed");
				return;
			}

			if (data.success) {
				router.push("/admin");
				router.refresh();
			}
		} catch (_err) {
			setError("An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<div className="flex items-center justify-center mb-4">
						<div className="rounded-full bg-primary/10 p-3">
							<Lock className="h-6 w-6 text-primary" />
						</div>
					</div>
					<CardTitle className="text-2xl text-center">Admin Login</CardTitle>
					<CardDescription className="text-center">
						Enter your password to access the admin panel
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						{error && (
							<Alert variant="destructive">
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter admin password"
								required
								disabled={loading}
								autoFocus
							/>
						</div>
						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? "Logging in..." : "Login"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
