import { Category } from '../../categories/entities/category.entity';
import { BalanceAccount } from '../../balance_accounts/entities/balance_account.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BalanceOperations } from '../../operations/entities/balance-operation.entity';

const statusIdActive = 100;
@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    first_name: string;

    @Column({nullable: false})
    last_name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({ default: statusIdActive })
    status: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @OneToMany(() => BalanceAccount, (account) => account.user)
    accounts: BalanceAccount[]

    @OneToMany(() => Category, (category) => category.user)
    categories: Category[]

    @OneToMany(() => BalanceOperations, (operation) => operation.user)
    operations: BalanceOperations[]
}
