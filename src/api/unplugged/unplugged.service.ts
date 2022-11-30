import { Injectable } from '@nestjs/common';
import * as Moment from 'moment';
import { UnpluggedEmail } from './unplugged.email';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class UnpluggedService {
  constructor(
    private readonly unpluggedEmail: UnpluggedEmail
  ) {}
  
  async requestCreatedByUser(emailData: any) {    
    emailData.request.startDate = Moment(emailData.request.startDate).format('MM-DD-YYYY');
    emailData.request.endDate = Moment(emailData.request.endDate).format('MM-DD-YYYY');

    await this.unpluggedEmail.requestCreatedByUserToUser(emailData);

    if (emailData.user.roleId === Role.admin || emailData.user.roleId === Role.coach) {
      await this.unpluggedEmail.requestCreatedByUserAdminTlToHr(emailData);
    }

    if (emailData.user.roleId === Role.jrCoach) {
      await this.unpluggedEmail.requestCreatedByUserJrTlToHr(emailData);
    }

    if (emailData.user.roleId === Role.va) {
      await this.unpluggedEmail.requestCreatedByUserToTl(emailData);
    }
    
    return true;
  }

  async requestCreatedByHr(emailData: any) {
    emailData.request.startDate = Moment(emailData.request.startDate).format('MM-DD-YYYY');
    emailData.request.endDate = Moment(emailData.request.endDate).format('MM-DD-YYYY');

    if (emailData.user.roleId === Role.admin || emailData.user.roleId === Role.coach) {
      await this.unpluggedEmail.requestCreatedByHrToUserTlAdmin(emailData);
    }

    if (emailData.user.roleId === Role.jrCoach || emailData.user.roleId === Role.va) {
      await this.unpluggedEmail.requestCreatedByHrToUser(emailData);
    }

    return true;
  }

  updateRequestEmail() {

  }

  approveRequestEmail() {

  }

  denyRequestEmail() {

  }
}
