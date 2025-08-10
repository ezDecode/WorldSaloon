/**
 * @fileOverview A service for sending WhatsApp messages using Twilio.
 */

import Twilio from 'twilio';

/**
 * Sends a WhatsApp confirmation message using the Twilio API.
 * 
 * It reads credentials from environment variables:
 * - TWILIO_ACCOUNT_SID: Your Twilio Account SID.
 * - TWILIO_AUTH_TOKEN: Your Twilio Auth Token.
 * - TWILIO_WHATSAPP_NUMBER: Your Twilio WhatsApp-enabled phone number.
 *
 * @param to The recipient's phone number in E.164 format (e.g., +14155238886).
 * @param message The message to send.
 * @returns A promise that resolves when the message is sent.
 */
export async function sendWhatsAppConfirmation(to: string, message: string): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    console.error("Twilio credentials are not configured in environment variables.");
    console.log("--- SIMULATING WHATSAPP MESSAGE (Twilio not configured) ---");
    console.log(`To: ${to}`);
    console.log(`Message: ${message}`);
    console.log("----------------------------------------------------------");
    // Don't throw an error, just log it so the booking can still succeed.
    return;
  }

  const client = Twilio(accountSid, authToken);

  try {
    await client.messages.create({
      from: fromNumber,
      to: `whatsapp:${to}`,
      body: message,
    });
    console.log(`WhatsApp message sent successfully to ${to}`);
  } catch (error) {
    console.error(`Failed to send WhatsApp message to ${to}:`, error);
    // Even if WhatsApp fails, we don't want to fail the whole booking process.
    // In a real app, you might add this to a retry queue.
    throw new Error('Failed to send WhatsApp confirmation.');
  }
}