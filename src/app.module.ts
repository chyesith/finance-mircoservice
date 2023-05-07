import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountServiceService } from './services/account-service/account-service.service';
import { InvoiceServiceService } from './services/invoice-service/invoice-service.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AccountServiceService, InvoiceServiceService],
})
export class AppModule {}
