import { Module } from '@nestjs/common';
import { UnpluggedEmail } from './unplugged.email';
import { UnpluggedService } from './unplugged.service';
import { UnpluggedController } from './unplugged.controller';

@Module({
  controllers: [UnpluggedController],
  providers: [UnpluggedService, UnpluggedEmail]
})
export class UnpluggedModule {}
