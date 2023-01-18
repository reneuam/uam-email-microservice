import { Injectable } from '@nestjs/common';
import * as Moment from 'moment';
import { UnpluggedEmail } from './unplugged.email';
import { Role } from 'src/common/enums/role.enum';
import { TransactionStatus } from 'src/common/enums/transactionStatus.enum';

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

    if (emailData.user.role_id === Role.admin || emailData.user.role_id === Role.coach) {
      await this.unpluggedEmail.requestCreatedByHrToUserTlAdmin(emailData);
    }

    if (emailData.user.role_id === Role.jrCoach || emailData.user.role_id === Role.va) {
      await this.unpluggedEmail.requestCreatedByHrToUser(emailData);
    }

    return true;
  }

  async updateRequestEmail(emailData: any) {
    emailData.request.startDate = Moment(emailData.request.startDate).format('MM-DD-YYYY');
    emailData.request.endDate = Moment(emailData.request.endDate).format('MM-DD-YYYY');

    if (emailData.transaction.transactionStatusId === TransactionStatus.approvedByTL) {
      emailData.requestStatus = 'approved';

      await this.unpluggedEmail.requestProcesedByTlToUser(emailData);
      await this.unpluggedEmail.requestProcesedByTlToHr(emailData);
    }

    if (emailData.transaction.transactionStatusId === TransactionStatus.deniedByTL) {
        emailData.requestStatus = 'denied';
      
      await this.unpluggedEmail.requestProcesedByTlToUser(emailData);
    } 
    
    if (emailData.transaction.transactionStatusId === TransactionStatus.approvedByHR) {      
      emailData.requestStatus = 'approved';

      if (emailData.user.role_id === Role.admin || emailData.user.role_id === Role.coach) {
        await this.unpluggedEmail.requestProcesedByHrToUserTlAdmin(emailData);
      } if (emailData.user.role_id === Role.jrCoach || emailData.user.role_id === Role.va) {
        await this.unpluggedEmail.requestProcesedByHrToUser(emailData);
      }
    }

    if (emailData.transaction.transactionStatusId === TransactionStatus.deniedByHR) {
      emailData.requestStatus = 'denied';
    
      if (emailData.user.role_id === Role.admin || emailData.user.role_id === Role.coach) {
        await this.unpluggedEmail.requestProcesedByHrToUserTlAdmin(emailData);
      } if (emailData.user.role_id === Role.jrCoach || emailData.user.role_id === Role.va) {
        await this.unpluggedEmail.requestProcesedByHrToUser(emailData);
      }
    } 
    
    if (emailData.transaction.transactionStatusId === TransactionStatus.cancelledByHR) {
      if (emailData.user.role_id === Role.admin || emailData.user.role_id === Role.coach) {
        await this.unpluggedEmail.requestCanceledByHrToUserTlAdmin(emailData);
      } if (emailData.user.role_id === Role.jrCoach || emailData.user.role_id === Role.va) {
        await this.unpluggedEmail.requestCanceledByHrToUser(emailData);
      }
    }
    
    return true;
  }

  async updateBalanceSystem(emailData: any) {
    await this.unpluggedEmail.balanceUpdatedBySystem(emailData);

    return true;
  }

  async updateBalanceHr(emailData: any) {
    await this.unpluggedEmail.balanceUpdatedByHr(emailData);

    return true;
  }
}
