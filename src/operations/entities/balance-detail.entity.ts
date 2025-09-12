import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BalanceOperations } from './balance-operation.entity';

const statusIdActive = 100;
@Entity('balance_details')
export class BalanceDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  operation_id: number;

  @Column()
  account_id: number;

  @Column({nullable: false})
  amount: number;

  @Column()
  prev_acc_amount: number;

  @Column()
  next_acc_amount: number;

  @Column({ default: statusIdActive })
  status: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => BalanceOperations, (operation) => operation.details)
  @JoinColumn({ name: 'operation_id' })
  operation: BalanceOperations;
}
