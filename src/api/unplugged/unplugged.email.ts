import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class UnpluggedEmail {
  constructor(private readonly mailerService: MailerService) {}

  async balanceUpdatedBySystem(emailData: any) {
    const users = emailData.users;

    const emailsSent = await Promise.all(
      users.map(async(user) => {         
        return await this.mailerService.sendMail({
          to: `${user.email}`,
          from: `"Unplugged" <${process.env.MAIL_USER}>`,
          subject: 'Your vacations balance has been updated',
          template: './balanceUpdatedBySystem',
          context: {
            vacationDays: emailData.vacationDays
          }
        })
        .then((success) => {
          console.log(success)
        })
        .catch((err) => {
          console.log('err', err)
        });
      })
    )

    return emailsSent;
  }

  async balanceUpdatedByHr(emailData: any) {
    return await this.mailerService.sendMail({
      to: `${emailData.user.email}`,
      from: `"Unplugged" <${process.env.MAIL_USER}>`,
      subject: 'Your balance have been updated',
      template: './balanceUpdatedByHr',
      context: {
        user: emailData.user,
        vacationDays: emailData.vacationDays
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
      subject: 'Unplugged - Request created by Human Resources',
      template: './requestCreatedByHrToUser',
      context: {
        request: emailData.request,
        requestType: emailData.requestType,
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
      subject: 'Unplugged - Request created by Human Resources',
      template: './requestCreatedByHrToUser',
      context: {
        request: emailData.request,
        requestType: emailData.requestType,
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

  async requestCreatedByCoachToUser(emailData: any) {
    return await this.mailerService.sendMail({
      to: `${emailData.user.email}`,
      from: `"Unplugged" <${process.env.MAIL_USER}>`,
      subject: 'Unplugged - Request created by your Team Leader',
      template: './requestCreatedByCoachToUser',
      context: {
        request: emailData.request,
        requestType: emailData.requestType,
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

  async requestCreatedByCoachToHr(emailData: any) {
    const hrEmails = emailData.hrEmails; 
    const emails = String(hrEmails);

    return await this.mailerService.sendMail({
      to: `${emails}`,
      from: `"Unplugged" <${process.env.MAIL_USER}>`,
      subject: `Unplugged - Request from ${emailData.user.firstname} ${emailData.user.lastname} created by Team Leader`,
      template: './requestCreatedByCoachToHr',
      context: {
        request: emailData.request,
        requestType: emailData.requestType,
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
      subject: 'Unplugged - Request created by you',
      template: './requestCreatedByUserToUser',
      context: {
        request: emailData.request,
        requestType: emailData.requestType
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
      subject: `Unplugged - Request created by ${emailData.user.firstname} ${emailData.user.lastname}`,
      template: './requestCreatedByUserToTl',
      context: {
        request: emailData.request,
        requestType: emailData.requestType,
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
      subject: `Unplugged - Request created by ${emailData.user.firstname} ${emailData.user.lastname}`,
      template: './requestCreatedByAdminTlToHr',
      context: {
        request: emailData.request,
        requestType: emailData.requestType,
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
      subject: `Unplugged - Request created by ${emailData.user.firstname} ${emailData.user.lastname}`,
      template: './requestCreatedByAdminTlToHr',
      context: {
        request: emailData.request,
        requestType: emailData.requestType,
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
      subject: `Unplugged - Request ${emailData.requestStatus} by your Team Leader`,
      template: './requestProcesedByTlToUser',
      context: {
        request: emailData.request,
        requestType: emailData.requestType,
        requestStatus: emailData.requestStatus
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
      subject: `Unplugged - Request from ${emailData.user.firstname} ${emailData.user.lastname} ${emailData.requestStatus} by Team Leader`,
      template: './requestProcesedByTlToHr',
      context: {
        request: emailData.request,
        requestType: emailData.requestType,
        requestStatus: emailData.requestStatus,
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

  async requestProcesedByHrToUser(emailData: any) {
    return await this.mailerService.sendMail({
      to: `${emailData.user.email}`,
      cc: `${emailData.coachEmail}`,
      from: `"Unplugged" <${process.env.MAIL_USER}>`,
      subject: `Unplugged - Request ${emailData.requestStatus} by Human Resources`,
      template: './requestProcesedByHrToUser',
      context: {
        request: emailData.request,
        requestType: emailData.requestType,
        requestStatus: emailData.requestStatus
      }
    })
    .then((success) => {
      console.log(success)
    })
    .catch((err) => {
      console.log(err)
    });
  }

  async requestProcesedByHrToUserTlAdmin(emailData: any) {
    return await this.mailerService.sendMail({
      to: `${emailData.user.email}`,
      from: `"Unplugged" <${process.env.MAIL_USER}>`,
      subject: `Unplugged - Request ${emailData.requestStatus} by Human Resources`,
      template: './requestProcesedByHrToUser',
      context: {
        request: emailData.request,
        requestType: emailData.requestType,
        requestStatus: emailData.requestStatus
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
    return await this.mailerService.sendMail({
      to: `${emailData.user.email}`,
      cc: `${emailData.coachEmail}`,
      from: `"Unplugged" <${process.env.MAIL_USER}>`,
      subject: 'Unplugged - Request canceled by Human Resources',
      template: './requestCanceledByHrToUser',
      context: {
        request: emailData.request,
        requestType: emailData.requestType
      }
    })
    .then((success) => {
      console.log(success)
    })
    .catch((err) => {
      console.log(err)
    });
  }

  async requestCanceledByHrToUserTlAdmin(emailData: any) {
    return await this.mailerService.sendMail({
      to: `${emailData.user.email}`,
      from: `"Unplugged" <${process.env.MAIL_USER}>`,
      subject: 'Unplugged - Request canceled by Human Resources',
      template: './requestCanceledByHrToUser',
      context: {
        request: emailData.request,
        requestType: emailData.requestType
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