"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactClient() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		projectType: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<{
		type: "success" | "error";
		message: string;
	} | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus(null);

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (response.ok) {
				setSubmitStatus({
					type: "success",
					message: "Thank you for your message! We'll get back to you soon.",
				});
				// Reset form
				setFormData({
					name: "",
					email: "",
					phone: "",
					projectType: "",
					message: "",
				});
			} else {
				setSubmitStatus({
					type: "error",
					message: data.error || "Failed to send message. Please try again.",
				});
			}
		} catch (_error) {
			setSubmitStatus({
				type: "error",
				message:
					"Failed to send message. Please try again or contact us directly at info@giraltenterprises.com",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const contactInfo = [
		{
			icon: MapPin,
			label: "Address",
			value: "1271 SW 124th Court, Unit G, Miami, Florida 33184",
		},
		{
			icon: Phone,
			label: "Phone",
			value: "786-246-7002",
			href: "tel:786-246-7002",
		},
		{
			icon: Mail,
			label: "Email",
			value: "info@giraltenterprises.com",
			href: "mailto:info@giraltenterprises.com",
		},
	];

	return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                        <Card>
                            <CardContent className="pt-6">
                                {submitStatus && (
                                    <div
                                        className={`p-4 rounded-lg mb-4 ${
                                            submitStatus.type === "success"
                                                ? "bg-green-100 text-green-800 border border-green-300"
                                                : "bg-red-100 text-red-800 border border-red-300"
                                        }`}
                                    >
                                        {submitStatus.message}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Name *</Label>
                                        <Input
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                setFormData({ ...formData, phone: e.target.value })
                                            }
                                            placeholder="(305) 555-0123"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="projectType">Project Type</Label>
                                        <Input
                                            id="projectType"
                                            value={formData.projectType}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    projectType: e.target.value,
                                                })
                                            }
                                            placeholder="e.g., Handrails, Docks, Seawalls"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="message">Message *</Label>
                                        <Textarea
                                            id="message"
                                            required
                                            value={formData.message}
                                            onChange={(e) =>
                                                setFormData({ ...formData, message: e.target.value })
                                            }
                                            placeholder="Tell us about your project..."
                                            rows={6}
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                        <div className="space-y-6">
                            {contactInfo.map((info) => (
                                <Card key={info.label}>
                                    <CardContent className="pt-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                                                <info.icon className="text-primary" size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-1">{info.label}</h3>
                                                {info.href ? (
                                                    <a
                                                        href={info.href}
                                                        className="text-muted-foreground hover:text-primary transition-colors"
                                                    >
                                                        {info.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-muted-foreground">
                                                        {info.value}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                                            <Clock className="text-primary" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Business Hours</h3>
                                            <p className="text-muted-foreground">Monday - Friday</p>
                                            <p className="text-muted-foreground">
                                                8:00 AM - 5:00 PM EST
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
	);
}
