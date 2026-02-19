import { Award, CheckCircle, MapPin } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "About Us",
	description:
		"Learn about Giralt Enterprises' 35+ years of experience in civil engineering products and innovation.",
};

export default function AboutPage() {
	const achievements = [
		{
			year: "1988",
			title: "Company Founded",
			description: "Giralt Enterprises established in Miami, Florida",
		},
		{
			year: "2002",
			title: "Patent Filed",
			description: "Invented weld-free aluminum picket handrail system",
		},
		{
			year: "2006",
			title: "Governor's Award",
			description: "Florida Engineering Society's Governor's New Product Award",
		},
		{
			year: "2007",
			title: "NSPE Award",
			description:
				"National Society of Professional Engineers New Product Award",
		},
		{
			year: "Present",
			title: "DOT Approvals",
			description:
				"Approved in Florida, Virginia, New York, Alabama, Georgia, and South Carolina",
		},
	];

	const dotApprovals = [
		"Florida",
		"Virginia",
		"New York",
		"Alabama",
		"Georgia",
		"South Carolina",
	];

	return (
		<div className="min-h-screen">
			<Navigation />

			{/* Hero */}
			<section className="bg-linear-to-br from-[oklch(0.15_0.12_253)] to-[oklch(0.18_0.12_253)] text-primary-foreground py-20 relative overflow-hidden">
				<div className="absolute inset-0 bg-[url('/blueprint-pattern.jpg')] opacity-20 bg-repeat invert" />
				<div className="absolute inset-0 bg-linear-to-b from-transparent to-[oklch(0.15_0.12_253)]/50" />
				<div className="container mx-auto px-4 relative z-10">
					<div className="max-w-3xl">
						<Badge
							variant="secondary"
							className="mb-4 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20"
						>
							About Us
						</Badge>
						<h1 className="text-4xl md:text-5xl font-bold mb-6">
							35+ Years of Engineering Excellence
						</h1>
						<p className="text-xl text-primary-foreground/90 leading-relaxed">
							At Giralt Enterprises, we go one step beyond product distribution,
							manufacturer representation, design, and onsite installation
							support.
						</p>
					</div>
				</div>
			</section>

			{/* Company Story */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<div className="prose prose-lg max-w-none">
							<p className="text-lg text-muted-foreground leading-relaxed mb-6">
								Since 1988, we have provided manufacturer representation and
								distribution for quality Civil Engineering construction
								products. Our services include design, design assistance,
								product supply, and field oversight during installation.
							</p>
							<p className="text-lg text-muted-foreground leading-relaxed mb-6">
								Our product line includes handrails, floating docks, fixed
								docks, fishing piers, wave attenuators, pedestrian bridges,
								boardwalks, and seawall materials.
							</p>
							<p className="text-lg text-muted-foreground leading-relaxed">
								We thrive on those "difficult" projects, where product knowledge
								and applications expertise become indispensable. Contact us, and
								we'll show you how our 35+ years of experience can help you on
								your next project.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Innovation Section */}
			<section className="py-20 bg-secondary/30">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<div className="flex items-center gap-3 mb-6">
							<Award className="text-accent" size={32} />
							<h2 className="text-3xl font-bold">Award-Winning Innovation</h2>
						</div>
						<Card className="border-2 border-accent/20">
							<CardContent className="pt-6">
								<p className="text-lg text-muted-foreground leading-relaxed mb-6">
									In 2002, we developed a unique aluminum picket handrail system
									that can be assembled{" "}
									<strong>without welding the pickets</strong>. This
									groundbreaking product was honored with prestigious awards
									from both state and national engineering societies.
								</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
									<div className="flex gap-4">
										<CheckCircle
											className="text-accent shrink-0"
											size={24}
										/>
										<div>
											<h3 className="font-semibold mb-2">
												2006 Governor's New Product Award
											</h3>
											<p className="text-sm text-muted-foreground">
												Florida Engineering Society / Florida Petroleum
												Equipment Institute
											</p>
										</div>
									</div>
									<div className="flex gap-4">
										<CheckCircle
											className="text-accent shrink-0"
											size={24}
										/>
										<div>
											<h3 className="font-semibold mb-2">
												2007 New Product Award
											</h3>
											<p className="text-sm text-muted-foreground">
												National Society of Professional Engineers / PEI
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Timeline */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
						Our Journey
					</h2>
					<div className="max-w-4xl mx-auto">
						<div className="space-y-8">
							{achievements.map((achievement, index) => (
								<div key={index} className="flex gap-6 group">
									<div className="flex flex-col items-center">
										<div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0 group-hover:scale-110 transition-transform">
											{achievement.year}
										</div>
										{index < achievements.length - 1 && (
											<div className="w-0.5 h-full bg-border mt-2" />
										)}
									</div>
									<div className="pb-8 flex-1">
										<h3 className="text-xl font-semibold mb-2">
											{achievement.title}
										</h3>
										<p className="text-muted-foreground">
											{achievement.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* DOT Approvals */}
			<section className="py-20 bg-secondary/30">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-3xl font-bold mb-6">
							Department of Transportation Approvals
						</h2>
						<p className="text-lg text-muted-foreground mb-8">
							Our innovative handrail system has received official approvals
							from six state DOTs
						</p>
						<div className="flex flex-wrap justify-center gap-3">
							{dotApprovals.map((state) => (
								<Badge
									key={state}
									variant="outline"
									className="text-base py-2 px-4 border-2"
								>
									<MapPin size={16} className="mr-2" />
									{state}
								</Badge>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Technical Excellence */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-3xl font-bold mb-8 text-center">
							Technical Excellence
						</h2>
						<Card>
							<CardContent className="pt-6">
								<p className="text-lg text-muted-foreground leading-relaxed mb-6">
									Most of our handrails are manufactured from{" "}
									<strong>aluminum alloy 6061-T6</strong>. This alloy has both
									high corrosion resistance and high strength.
								</p>
								<div className="bg-secondary/50 rounded-lg p-6">
									<p className="text-center">
										<span className="text-2xl font-bold text-primary">
											AA 6061-T6
										</span>
										<span className="text-muted-foreground mx-3">
											has a yield strength of
										</span>
										<span className="text-2xl font-bold text-accent">
											35,000 psi
										</span>
									</p>
									<p className="text-center text-sm text-muted-foreground mt-2">
										Comparable to ASTM A-36 steel at 36,000 psi
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Licensing */}
			<section className="bg-linear-to-r from-[oklch(0.15_0.12_253)] to-[oklch(0.18_0.12_253)] text-primary-foreground relative overflow-hidden">
				<div className="absolute inset-0 bg-[url('/blueprint-pattern.jpg')] opacity-20 bg-repeat invert" />
				<div className="container mx-auto px-4 text-center relative z-10">
					<h2 className="text-3xl font-bold mb-4">
						Manufacturing Opportunities
					</h2>
					<p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
						We are currently seeking manufacturers who wish to fabricate our
						handrail system under license.
					</p>
				</div>
			</section>

			<Footer />
		</div>
	);
}
