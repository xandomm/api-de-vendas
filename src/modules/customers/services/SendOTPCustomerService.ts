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

  public async sendOTP(to: string): Promise<boolean> {
    try {
      const service = await this.client.verify.v2.services.create({
        friendlyName: 'Cesta feira',
      });

      const verification = await this.client.verify.v2
        .services(service.sid)
        .verifications.create({ to, channel: 'sms' });
      if (!verification.lookup) {
        console.log(verification.lookup);
        return false;
      }
      console.log(`OTP sent successfully to ${to}`);
      return true;
    } catch (error) {
      console.error('Error sending OTP:', error);
      return false;
    }
  }
  public async validateOTP(to: string, code: string): Promise<boolean> {
    try {
      const service = await this.client.verify.v2.services.create({
        friendlyName: 'Cesta feira',
      });
      console.log(service.sid);
      await this.client.verify.v2
        .services(`${accountSid}`)
        .verificationChecks.create({ to, code })
        .then(check => {
          if (check.status !== 'approved') {
            console.log(check.status);
            return false;
          }
        })
        .catch(error => {
          console.error('Error validating OTP:', error);
          return false;
        });

      return true;
    } catch (error) {
      console.error('Error validating OTP:', error);
      return false;
    }
  }
}
