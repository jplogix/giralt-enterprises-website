import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
	title: "Contact Us",
	description:
		"Get in touch with Giralt Enterprises for quotes, technical specifications, or specialized civil engineering product info.",
};

export default function ContactPage() {
	return (
		<div className="min-h-screen">
			<Navigation />

			{/* Hero */}
			<section className="bg-linear-to-br from-primary to-accent text-primary-foreground py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl">
						<Badge
							variant="secondary"
							className="mb-4 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20"
						>
							Contact Us
						</Badge>
						<h1 className="text-4xl md:text-5xl font-bold mb-6">
							Get In Touch
						</h1>
						<p className="text-xl text-primary-foreground/90 leading-relaxed">
							Contact us today and we'll show you how our 35+ years of
							experience can help you on your next project.
						</p>
					</div>
				</div>
			</section>

			<ContactClient />

			{/* Map */}
			<section className="py-20 bg-secondary/30">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8 text-center">Our Location</h2>
					<div className="max-w-5xl mx-auto">
						<Card className="overflow-hidden">
							<div className="relative h-96 bg-muted">
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.079876543!2d-80.389!3d25.67!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b6a8b8b8b8b9%3A0x8b8b8b8b8b8b8b8b!2s1271%20SW%20124th%20Ct%20G%2C%20Miami%2C%20FL%2033184!5e0!3m2!1sen!2sus!4v1704067200000"
									width="100%"
									height="100%"
									style={{ border: 0 }}
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									title="Giralt Enterprises Location"
								/>
							</div>
						</Card>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
