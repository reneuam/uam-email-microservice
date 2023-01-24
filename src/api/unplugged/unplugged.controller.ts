import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UnpluggedService } from './unplugged.service';

@Controller()
export class UnpluggedController {
  constructor(private readonly unpluggedService: UnpluggedService) {}

  @MessagePattern('createRequestUserEmail')
  createRequestUserEmail(@Payload() emailData: any) {
    return this.unpluggedService.requestCreatedByUser(emailData);
  }

  @MessagePattern('createRequestCoachEmail')
  createRequestCoachEmail(@Payload() emailData: any) {
    console.log('Email sent');
    
    return this.unpluggedService.requestCreatedByCoach(emailData);
  }

  @MessagePattern('createRequestHrEmail')
  createRequestHrEmail(@Payload() emailData: any) {
    return this.unpluggedService.requestCreatedByHr(emailData);
  }

  @MessagePattern('updateRequestEmail')
  updateRequestEmail(@Payload() emailData: any) {
    return this.unpluggedService.updateRequestEmail(emailData);
  }

  @MessagePattern('updateBalanceSystemEmail')
  updateBalanceSystemEmail(@Payload() emailData: any) {    
    return this.unpluggedService.updateBalanceSystem(emailData);
  }

  @MessagePattern('updateBalanceHrEmail')
  updateBalanceHrEmail(@Payload() emailData: any) {
    return this.unpluggedService.updateRequestEmail(emailData);
  }
}
