import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { BalanceAccount } from './balance_account.entity';

const statusIdActive = 100;
@Entity('balance_account_types')
export class BalanceAccountTypes {

    @PrimaryColumn()
    id: number;

    @Column()
    slug: string

    @Column()
    label: string

    @Column({ default: statusIdActive })
    status : number

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @OneToMany(() => BalanceAccount, (account) => account.type_id)
    accounts: BalanceAccount[]
}