import { BalanceDetails } from '../../operations/entities/balance-detail.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, Unique, Index } from 'typeorm';
import { BalanceAccountTypes } from './balance_account_type.entity';
import { User } from '../../users/entities/user.entity';

const statusIdActive = 100;

@Entity('balance_accounts')
@Index(['user_id', 'type_id', 'number'], { unique: true })
export class BalanceAccount {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type_id: number;

    @Column()
    label: string;

    @Column()
    user_id: number;

    @Column({ default: 0 })
    amount: number;

    @Column()
    number: string;

    @Column({ default: statusIdActive })
    status: number;

    @Column({ nullable: true })
    description: string;    

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @OneToMany(() => BalanceDetails, (detail) => detail.account_id)
    details: BalanceDetails[]

    @ManyToOne(() => BalanceAccountTypes, (type) => type.accounts)
    @JoinColumn({ name: 'type_id' })
    type: BalanceAccountTypes

    @ManyToOne(() => User, (user) => user.accounts)
    @JoinColumn({ name: 'user_id' })
    user: User
}
