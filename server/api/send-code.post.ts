import { Resend } from "resend";
import { codeStore } from "~/server/lib/codes";
import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email } = body;

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing email",
    });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const emailContent = {
    companyName: "Makise",
    logoUrl: "https://images.app.goo.gl/oCkpw4jVQDWki6P46",
    websiteUrl: "https://no-domain.com",
    supportEmail: process.env.SMTP_USER,
    subject: `[${code}] Verification Code`,
    header: "Your Verification Code",
    introText: "Please copy this verification code and paste it into the app or website:",
    instructions: [
      "Tap and hold the code to copy it.",
      "Make sure to paste the code exactly as shown.",
      "If you didn’t request this email, please ignore it or contact our support team.",
    ],
    footerNote: `&copy; ${new Date().getFullYear()} Makise. All rights reserved.`,
  };

  try {
    const data = await transporter.sendMail({
      from: `"${emailContent.companyName}" <${process.env.SMTP_USER}>`,
      to: email,
      subject: emailContent.subject,
      html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${emailContent.header}" />
    <title>${emailContent.subject}</title>
  </head>
  <body style="margin: 0; padding: 0; background: #f9f9f9;">
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: auto; padding: 40px; background: #ffffff; border-radius: 12px; box-shadow: 0 0 20px rgba(0,0,0,0.05); border: 1px solid #eaeaea;">
      <header style="text-align: center; margin-bottom: 30px;">
        <img src="${emailContent.logoUrl}" alt="${emailContent.companyName} Logo" style="height: 60px; margin-bottom: 15px;" />
      </header>

      <div style="max-width: 600px; margin: auto; padding: 20px; text-align:center">
        <h2 style="color: #2c54c6;">${emailContent.header}</h2>
        <p style="font-size: 16px;">${emailContent.introText}</p>

        <div style="background: #f2f6ff; padding: 18px; font-size: 1.8rem; font-weight: bold; text-align: center; border-radius: 10px; letter-spacing: 4px; color: #2c54c6; user-select: all;">
          ${code}
        </div>

        <p style="text-align: center; font-size: 14px; color: #666; margin-top: 25px;">📋 ${emailContent.instructions[0]}</p>
        <p style="text-align: center; font-size: 14px; color: #999;">This code will expire in 5 minutes.</p>
      </div>

      <section style="font-size: 0.9rem; color: #555; line-height: 1.5; border-top: 1px solid #ddd; padding-top: 25px;">
        <h3 style="color: #333; margin-bottom: 10px;">Need Help?</h3>
        <ul style="list-style: disc inside; margin-top: 10px; color: #666;">
          ${emailContent.instructions
            .slice(1)
            .map((item) => `<li>${item}</li>`)
            .join("")}
        </ul>
      </section>

      <footer style="margin-top: 40px; font-size: 0.8rem; color: #aaa; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
        <p>This email was sent by <strong>${emailContent.companyName}</strong> (<a href="${emailContent.websiteUrl}" style="color: #666; text-decoration: none;">${emailContent.websiteUrl}</a>)</p>
        <p>If you have questions or concerns, contact us at <a href="mailto:${emailContent.supportEmail}" style="color: #2c54c6; text-decoration: none;">${emailContent.supportEmail}</a></p>
        <p style="margin-top: 15px; color: #ccc;">${emailContent.footerNote}</p>
      </footer>
    </div>
  </body>
</html>`,
    });

    codeStore.set(email, { code, createdAt: Date.now() });
    return { success: true, message: "Code sent successfully", data };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to send email, error:" + error,
    });
  }
});
