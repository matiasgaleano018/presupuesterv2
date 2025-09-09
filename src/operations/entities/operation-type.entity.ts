import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { BalanceOperations } from './balance-operation.entity';
import { Category } from '../../categories/entities/category.entity';

const statusIdActive = 100;
@Entity('operations_types')
export class OperationTypes {

    @PrimaryGeneratedColumn()
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

    @OneToMany(() => BalanceOperations, (operation) => operation.type_id)
    operations: BalanceOperations[]

    @OneToMany(() => Category, (category) => category.type_id)
    categories: Category[]
}