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

  @MessagePattern('createRequestHrEmail')
  createRequestHrEmail(@Payload() emailData: any) {
    return this.unpluggedService.requestCreatedByHr(emailData);
  }

  @MessagePattern('updateRequestEmail')
  updateRequestEmail() {
    return this.unpluggedService.updateRequestEmail();
  }

  @MessagePattern('approveRequestEmail')
  approveRequestEmail() {
    return this.unpluggedService.approveRequestEmail();
  }

  @MessagePattern('denyRequestEmail')
  denyRequestEmail() {
    return this.unpluggedService.denyRequestEmail();
  }
}
