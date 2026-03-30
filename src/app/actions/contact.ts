"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  name: string;
  email: string;
  message: string;
}

export async function sendEmail({ name, email, message }: SendEmailParams) {
  if (!name || !email || !message) {
    return { error: "All fields are required." };
  }

  // Simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Invalid email address." };
  }

  try {
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "shaguntiwari0611@gmail.com",
      subject: `New Message from ${name} via Portfolio`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
          <h2 style="color: #333;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
            <p style="white-space: pre-wrap;"><strong>Message:</strong><br />${message}</p>
          </div>
        </div>
      `,
    });

    if (data.error) {
      console.error("Resend Error:", data.error);
      return { error: "Failed to send email. Please try again later." };
    }

    return { success: "Message sent! I'll get back to you soon." };
  } catch (err: any) {
    console.error("Server Action Error:", err);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
