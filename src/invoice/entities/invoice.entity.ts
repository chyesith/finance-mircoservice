import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from '../../account/entities/account.entity';
import { MaxLength, MinLength } from 'class-validator';

export enum Types {
  Fee = 'course',
  Overdue = 'overDue',
}

export enum Status {
  Paid = 'paid',
  Outstanding = 'outstanding',
  Cancelled = 'cancelled',
}

@Entity()
export class Invoice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 10 })
  @MinLength(1)
  @MaxLength(10)
  reference: string;
  @Column()
  amount: number;

  @Column()
  dueDate: string;

  @Column({
    type: 'enum',
    enum: Types,
  })
  type: Types;

  @Column()
  status: Status;

  @ManyToOne(() => Account, (account) => account.invoices)
  account: Account;
}
