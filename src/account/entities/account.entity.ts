import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Invoice } from '../../invoice/entities/invoice.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentId: number;

  @OneToMany(() => Invoice, (invoice) => invoice.account)
  invoiceList: Invoice[];

  HasOutstandingBalance: boolean;
}
