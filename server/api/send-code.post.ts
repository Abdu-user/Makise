import { Resend } from "resend";
import { codeStore } from "~/server/lib/codes";

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
  const resend = new Resend(useRuntimeConfig().resendApiKey);

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your Verification Code",
      html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: auto; padding: 40px; background: #ffffff; border-radius: 12px; box-shadow: 0 0 20px rgba(0,0,0,0.05); border: 1px solid #eaeaea;">
  
  <!-- Header -->
  <header style="text-align: center; margin-bottom: 30px;">
    <img src="https://yourdomain.com/logo.png" alt="Your Company Logo" style="height: 60px; margin-bottom: 15px;" />
    <h1 style="color: #333; font-weight: 700; font-size: 2.5rem; margin: 0;">Verify Your Email Address</h1>
    <p style="color: #666; font-size: 1.15rem; margin-top: 8px;">
      Welcome to <strong>Your Company</strong>! Let's get your account verified.
    </p>
  </header>
  
  <!-- Instruction -->
  <section style="padding: 20px 25px; background: #f9f9fb; border-radius: 10px; border: 1px solid #ddd; margin-bottom: 35px;">
    <p style="font-size: 1.1rem; color: #444; line-height: 1.6;">
      Please use the verification code below to complete your sign-up process. This code is <strong>valid for 15 minutes</strong> for your security.
    </p>
    <p style="font-size: 0.9rem; color: #999; margin-top: 10px;">
      If you did not request this, you can safely ignore this email.
    </p>
  </section>
  
  <!-- Verification Code Box -->
  <div style="display: flex; justify-content: center; margin-bottom: 40px;">
    <div style="
      background: #e1e8ff;
      padding: 25px 50px;
      border-radius: 12px;
      font-size: 3.5rem;
      font-weight: 800;
      color: #2c54c6;
      letter-spacing: 15px;
      user-select: all;
      box-shadow: 0 2px 8px rgba(44, 84, 198, 0.3);
      text-align: center;
      min-width: 320px;
      ">
      ${code}
    </div>
  </div>
  
 <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
  <h2 style="color: #2c54c6;">Your Verification Code</h2>
  <p style="font-size: 16px;">Please copy this verification code and paste it into the app or website:</p>

  <!-- Code Box -->
  <div style="
    background: #f2f6ff;
    padding: 18px;
    font-size: 1.8rem;
    font-weight: bold;
    text-align: center;
    border-radius: 10px;
    letter-spacing: 4px;
    color: #2c54c6;
    user-select: all;">
    ${code}
  </div>

  <!-- Tip (not a real button) -->
  <p style="text-align: center; font-size: 14px; color: #666; margin-top: 25px;">
    📋 To copy, just <strong>tap and hold</strong> the code, then choose <em>"Copy"</em>.
  </p>

  <p style="text-align: center; font-size: 14px; color: #999;">
    This code will expire in 5 minutes.
  </p>
</div>

  
  <!-- Troubleshooting -->
  <section style="font-size: 0.9rem; color: #555; line-height: 1.5; border-top: 1px solid #ddd; padding-top: 25px;">
    <h3 style="color: #333; margin-bottom: 10px;">Need Help?</h3>
    <p>
      If you’re having trouble copying or using the code, please try these tips:
    </p>
    <ul style="list-style: disc inside; margin-top: 10px; color: #666;">
      <li>Click the "Copy Code" button above to copy it automatically.</li>
      <li>Make sure to paste the code exactly as shown.</li>
      <li>If you didn’t request this email, please ignore it or contact our support team.</li>
    </ul>
  </section>
  
  <!-- Footer -->
  <footer style="margin-top: 40px; font-size: 0.8rem; color: #aaa; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
    <p>This email was sent by <strong>Your Company</strong> (<a href="https://yourdomain.com" style="color: #666; text-decoration: none;">yourdomain.com</a>)</p>
    <p>
      If you have questions or concerns, contact us at 
      <a href="mailto:support@yourdomain.com" style="color: #2c54c6; text-decoration: none;">support@yourdomain.com</a>
    </p>
    <p style="margin-top: 15px; color: #ccc;">&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
  </footer>
</div>

      `,
    });

    codeStore.set(email, { code, createdAt: Date.now() });
    return { success: true, message: "Code sent successfully", data };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to send email",
    });
  }
});
