"use client";

import { usePathname } from "next/navigation";
import { AuthWrapper } from "@/components/admin/auth-wrapper";
import { Navigation } from "@/components/navigation";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const isLoginPage = pathname === "/admin/login";

	return (
		<AuthWrapper>
			{isLoginPage ? (
				children
			) : (
				<div className="min-h-screen">
					<Navigation />
					{children}
				</div>
			)}
		</AuthWrapper>
	);
}
