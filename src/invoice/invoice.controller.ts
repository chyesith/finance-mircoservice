import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  findAll() {
    //  return this.invoiceService.findAll();
  }

  @Get(':ref')
  findOne(@Param('ref') ref: string) {
    return this.invoiceService.findOne(ref);
  }

  @Get('outstanding/:email')
  findUnpaidInvoices(@Param('email') email: string) {
    return this.invoiceService.unPaidInvoices(email);
  }

  @Get('finance/:email')
  gradCheck(@Param('email') email: string) {
    return this.invoiceService.graduationEligibility(email);
  }

  @Patch('/update:ref')
  public async update(@Param('ref') ref: string) {
    return await this.invoiceService.update(ref);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return; // this.invoiceService.re(+id);
  }
}
