import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);
interface SMS {
  to: string;
  message: string;
}
export async function sendSMS({ to, message }: SMS): Promise<string> {
  try {
    await client.messages.create({
      body: message,
      from: phoneNumber,
      to,
    });
    console.log('To');
    return 'Message sent with success';
  } catch (error) {
    console.error('Erro ao enviar SMS:', error);
    throw new Error('Erro ao enviar SMS');
  }
}
