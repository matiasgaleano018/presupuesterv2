import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

const statusIdActive = 100;

@Entity('balance_accounts')
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

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
