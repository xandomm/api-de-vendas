import AppError from '@shared/errors/AppError';
import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

export default class SendOTPCustomerService {
  private client: twilio.Twilio;

  constructor() {
    this.client = twilio(accountSid, authToken);
  }

  public async sendOTP(to: string): Promise<void> {
    try {
      const service = await this.client.verify.v2.services.create({
        friendlyName: 'My Verify Service',
      });
      const send = await this.client.verify.v2
        .services(service.sid)
        .verifications.create({ to, channel: 'sms' });

      console.log(`OTP sent successfully to ${to}`);
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw new Error('Failed to send OTP');
    }
  }

  public async validateOTP(to: string, code: string): Promise<boolean> {
    try {
      const service = await this.client.verify.v2.services.create({
        friendlyName: 'My Verify Service',
      });
      const verificationCheck = await this.client.verify.v2
        .services(service.sid)
        .verificationChecks.create({ to, code });

      console.log(verificationCheck);
      console.log(verificationCheck.status);
      console.log(verificationCheck.valid);
      console.log(verificationCheck.to);
      console.log(verificationCheck.sid);
      console.log(verificationCheck.channel);

      if (verificationCheck.status === 'approved') {
        console.log(`OTP validation successful for ${to}`);
        return true;
      } else {
        throw new AppError('Failed to validate OTP');
      }
    } catch (error) {
      console.error('Error validating OTP:', error);
      throw new AppError('Failed to validate OTP', 500);
    }
  }
}
