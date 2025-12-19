import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { name, email, phone, projectType, message } = body;

		// Validate required fields
		if (!name || !email || !message) {
			return NextResponse.json(
				{ error: "Name, email, and message are required" },
				{ status: 400 },
			);
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: "Invalid email address" },
				{ status: 400 },
			);
		}

		// If Resend is configured, use it
		if (process.env.RESEND_API_KEY) {
			const { Resend } = await import("resend");
			const resend = new Resend(process.env.RESEND_API_KEY);

			const emailContent = `
New Contact Form Submission

From: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Project Type: ${projectType || "Not specified"}

Message:
${message}
      `.trim();

			await resend.emails.send({
				from: process.env.EMAIL_FROM || "onboarding@resend.dev",
				to: "info@giraltenterprises.com",
				subject: `Contact Form: ${name} - ${projectType || "General Inquiry"}`,
				text: emailContent,
				replyTo: email,
			});

			return NextResponse.json({
				success: true,
				message: "Message sent successfully",
			});
		}

		// Fallback: Use Nodemailer with SMTP
		if (
			process.env.SMTP_HOST &&
			process.env.SMTP_USER &&
			process.env.SMTP_PASS
		) {
			const nodemailer = await import("nodemailer");

			const transporter = nodemailer.default.createTransport({
				host: process.env.SMTP_HOST,
				port: Number.parseInt(process.env.SMTP_PORT || "587"),
				secure: process.env.SMTP_SECURE === "true",
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASS,
				},
			});

			const emailContent = `
New Contact Form Submission

From: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Project Type: ${projectType || "Not specified"}

Message:
${message}
      `.trim();

			await transporter.sendMail({
				from: process.env.SMTP_FROM || process.env.SMTP_USER,
				to: "info@giraltenterprises.com",
				subject: `Contact Form: ${name} - ${projectType || "General Inquiry"}`,
				text: emailContent,
				replyTo: email,
			});

			return NextResponse.json({
				success: true,
				message: "Message sent successfully",
			});
		}

		// If no email service is configured, log the message
		console.log("=== Contact Form Submission ===");
		console.log("TO: info@giraltenterprises.com");
		console.log("From:", name);
		console.log("Email:", email);
		console.log("Phone:", phone);
		console.log("Project Type:", projectType);
		console.log("Message:", message);
		console.log("==============================");

		return NextResponse.json({
			success: true,
			message: "Message received (email service not configured)",
			warning:
				"Email service not configured. Please set up RESEND_API_KEY or SMTP credentials.",
		});
	} catch (error) {
		console.error("Contact form error:", error);
		return NextResponse.json(
			{
				error:
					"Failed to send message. Please try again or contact us directly.",
			},
			{ status: 500 },
		);
	}
}
