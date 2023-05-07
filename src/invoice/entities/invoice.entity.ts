import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from '../../account/entities/account.entity';
import { MaxLength, MinLength } from 'class-validator';

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

  @Column()
  type: Types;

  @Column()
  status: Status;

  @ManyToMany(() => Account)
  @JoinTable()
  account: Account;
}
