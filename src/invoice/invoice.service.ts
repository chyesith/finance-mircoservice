import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice, Status } from './entities/invoice.entity';
import { Account } from '../account/entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);
    const reference = Math.floor(100000 + Math.random() * 900000);
    const student = await this.accountRepository.findOneBy({
      email: createInvoiceDto.email,
    });
    createInvoiceDto['reference'] = reference;
    createInvoiceDto['account'] = student;
    createInvoiceDto['dueDate'] = dueDate;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const invoiceCreate = this.invoiceRepository.create(createInvoiceDto);
    await this.invoiceRepository.save(invoiceCreate);
    return createInvoiceDto;
  }

  findOne(ref: string) {
    return this.invoiceRepository.findOneBy({ reference: ref });
  }

  async unPaidInvoices(email: string) {
    const student = await this.accountRepository.findOneBy({
      email: email,
    });
    return this.invoiceRepository.find({
      where: {
        status: Status.Outstanding,
        account: student.invoices,
      },
      relations: ['account'],
    });
  }

  async graduationEligibility(email: string) {
    const invoices = await this.unPaidInvoices(email);
    if (invoices.length > 0) {
      return false;
    }
    return true;
  }

  async update(ref: string) {
    return this.invoiceRepository.update(
      { reference: ref },
      { status: Status.Paid },
    );
  }
}
