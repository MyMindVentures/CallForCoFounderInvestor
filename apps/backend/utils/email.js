import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { logError } from './errorHandler.js';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendThankYouEmail = async (to, name) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject: 'Thank you for your support!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Dear ${name},</h2>
          <p>Thank you so much for reaching out and showing your support!</p>
          <p>Your message means a lot to me, and I truly appreciate you taking the time to connect.</p>
          <p>I'll review your message and get back to you as soon as possible.</p>
          <p>Best regards,<br/>The Founder</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
      console.log('Thank you email sent:', info.messageId);
    }
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logError('EmailService.sendThankYouEmail', error);
    return { success: false, error: error.message };
  }
};
