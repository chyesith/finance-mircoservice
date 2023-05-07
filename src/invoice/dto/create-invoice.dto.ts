import { ApiProperty } from '@nestjs/swagger';
import { Types } from '../entities/invoice.entity';

export class CreateInvoiceDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  types: Types;
}
