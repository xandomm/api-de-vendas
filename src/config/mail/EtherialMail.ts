import nodemailer from 'nodemailer';
import handleBarsMailTemplate from './HandlebarsMailTemplate';

interface ImailContact {
  name: string;
  email: string;
}

interface ISendEmail {
  to: ImailContact;
  from?: ImailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}

export default class EtherialMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendEmail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const mailTemplate = new handleBarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe API vendas',
        address: from?.email || 'equipe@apivendas.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject: subject,
      html: await mailTemplate.parse(templateData),
    });
    console.log('message sent: %s', message.messageId);
    console.log('preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
