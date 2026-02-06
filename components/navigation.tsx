"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navigation() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const navLinks = [
		{ href: "/", label: "Home" },
		{ href: "/about", label: "About" },
		{ href: "/products", label: "Products" },
		{ href: "/gallery", label: "Gallery" },
		{ href: "/blog", label: "Blog" },
		{ href: "/awards", label: "Awards" },
		{ href: "/contact", label: "Contact" },
	];

	return (
		<nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 border-b border-border">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-20">
					<Link href="/" className="flex items-center">
						<Image
							src="/GIRALT-LOGO-NEW.svg"
							alt="Giralt Enterprises"
							width={240}
							height={80}
							className="h-16 w-auto"
							priority
						/>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-8">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
							>
								{link.label}
							</Link>
						))}
						<Button asChild>
							<Link href="/contact">Request Quote</Link>
						</Button>
					</div>

					{/* Mobile Menu Button */}
					<button
						type="button"
						className="md:hidden"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label="Toggle menu"
					>
						{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{/* Mobile Navigation */}
				{mobileMenuOpen && (
					<div className="md:hidden py-4 border-t border-border">
						<div className="flex flex-col gap-4">
							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
									onClick={() => setMobileMenuOpen(false)}
								>
									{link.label}
								</Link>
							))}
							<Button asChild className="w-full">
								<Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
									Request Quote
								</Link>
							</Button>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
