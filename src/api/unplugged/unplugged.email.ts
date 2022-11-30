import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class UnpluggedEmail {
  constructor(private readonly mailerService: MailerService) {}

  async balanceUpdatedBySystem(emailData: any) {
    return await this.mailerService.sendMail({
      to: `${emailData.user.email}`,
      from: `"Unplugged" <${process.env.MAIL_USER}>`,
      subject: 'Request created successfully by you',
      template: './requestCreatedUserToUser',
      context: {
        request: emailData.request
      }
    })
    .then((success) => {
      console.log(success)
    })
    .catch((err) => {
      console.log(err)
    });
  }

  async requestCreatedByHrToUser(emailData: any) {
    const hrEmails = emailData.hrEmails; 
    const emails = String(hrEmails);

    return await this.mailerService.sendMail({
      to: `${emailData.user.email}`,
      cc: `${emailData.coachEmail}`,
      from: `"Unplugged" <${process.env.MAIL_USER}>`,
      subject: 'Request created successfully by you coach',
      template: './requestCreatedByHrToUser',
      context: {
        request: emailData.request,
        user: emailData.user
      }
    })
    .then((success) => {
      console.log(success)
    })
    .catch((err) => {
      console.log(err)
    });
  }

  async requestCreatedByHrToUserTlAdmin(emailData: any) {
    return await this.mailerService.sendMail({
      to: `${emailData.user.email}`,
      from: `"Unplugged" <${process.env.MAIL_USER}>`,
      subject: 'Request created successfully by you coach',
      template: './requestCreatedByHrToUser',
      context: {
        request: emailData.request,
        user: emailData.user
      }
    })
    .then((success) => {
      console.log(success)
    })
    .catch((err) => {
      console.log(err)
    });
  }
  
  async requestCreatedByUserToUser(emailData: any) {
    return await this.mailerService.sendMail({
      to: `${emailData.user.email}`,
      from: `"Unplugged" <${process.env.MAIL_USER}>`,
      subject: 'Request created successfully by you',
      template: './requestCreatedByUserToUser',
      context: {
        request: emailData.request
      }
    })
    .then((success) => {
      console.log(success)
    })
    .catch((err) => {
      console.log(err)
    });
  }

  async requestCreatedByUserToTl(emailData: any) {
    return await this.mailerService.sendMail({
      to: `${emailData.coachEmail}`,
      from: `"Unplugged" <${process.env.MAIL_USER}>`,
      subject: 'Request created successfully by you coach',
      template: './requestCreatedByUserToTl',
      context: {
        request: emailData.request,
        user: emailData.user
      }
    })
    .then((success) => {
      console.log(success)
    })
    .catch((err) => {
      console.log(err)
    });
  }

  async requestCreatedByUserAdminTlToHr(emailData: any) {
    const hrEmails = emailData.hrEmails; 
    const emails = String(hrEmails);

    return await this.mailerService.sendMail({
      to: `${emails}`,
      from: `"Unplugged" <${process.env.MAIL_USER}>`,
      subject: 'Request created successfully by you coach',
      template: './requestCreatedByAdminTlToHr',
      context: {
        request: emailData.request,
        user: emailData.user
      }
    })
    .then((success) => {
      console.log(success)
    })
    .catch((err) => {
      console.log(err)
    });
  }

  async requestCreatedByUserJrTlToHr(emailData: any) {
    const hrEmails = emailData.hrEmails; 
    const emails = String(hrEmails);

    return await this.mailerService.sendMail({
      to: `${emails}`,
      cc: `${emailData.coachEmail}`,
      from: `"Unplugged" <${process.env.MAIL_USER}>`,
      subject: 'Request created successfully by you coach',
      template: './requestCreatedByAdminTlToHr',
      context: {
        request: emailData.request,
        user: emailData.user
      }
    })
    .then((success) => {
      console.log(success)
    })
    .catch((err) => {
      console.log(err)
    });
  }

  async requestProcesedByTlToUser(emailData: any) {
    return await this.mailerService.sendMail({
      to: `${emailData.user.email}`,
      from: `"Unplugged" <${process.env.MAIL_USER}>`,
      subject: 'Request created successfully by you',
      template: './requestProcesedByTlToUser',
      context: {
        request: emailData.request
      }
    })
    .then((success) => {
      console.log(success)
    })
    .catch((err) => {
      console.log(err)
    });
  }

  async requestProcesedByTlToHr(emailData: any) {
    const hrEmails = emailData.hrEmails; 
    const emails = String(hrEmails);

    return await this.mailerService.sendMail({
      to: `${emails}`,
      from: `"Unplugged" <${process.env.MAIL_USER}>`,
      subject: 'Request created successfully by you',
      template: './requestProcesedByTlToHr',
      context: {
        request: emailData.request
      }
    })
    .then((success) => {
      console.log(success)
    })
    .catch((err) => {
      console.log(err)
    });
  }

  async requestProcesedByHrToUser(emailData: any) {
    const hrEmails = emailData.hrEmails; 
    const emails = String(hrEmails);

    return await this.mailerService.sendMail({
      to: `${emails}`,
      from: `"Unplugged" <${process.env.MAIL_USER}>`,
      subject: 'Request created successfully by you',
      template: './requestProcesedByHrToUser',
      context: {
        request: emailData.request
      }
    })
    .then((success) => {
      console.log(success)
    })
    .catch((err) => {
      console.log(err)
    });
  }

  async requestCanceledByHrToUser(emailData: any) {
    const hrEmails = emailData.hrEmails; 
    const emails = String(hrEmails);

    return await this.mailerService.sendMail({
      to: `${emails}`,
      from: `"Unplugged" <${process.env.MAIL_USER}>`,
      subject: 'Request created successfully by you',
      template: './requestCanceledByHrToUser',
      context: {
        request: emailData.request
      }
    })
    .then((success) => {
      console.log(success)
    })
    .catch((err) => {
      console.log(err)
    });
  }
}