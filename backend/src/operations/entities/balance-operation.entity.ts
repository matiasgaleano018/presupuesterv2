import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { OperationTypes } from './operation-type.entity';
import { BalanceDetails } from './balance-detail.entity';
import { User } from '../../users/entities/user.entity';

const statusIdActive = 100;
@Entity('balance_operations')
export class BalanceOperations {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type_id : number

    @Column()
    user_id : number

    @Column()
    category_id: number

    @Column()
    amount: number

    @Column({ default: statusIdActive })
    status : number

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @OneToMany(() => BalanceDetails, (detail) => detail.operation_id)
    details: BalanceDetails[];

    @ManyToOne(() => OperationTypes, (type) => type.operations)
    @JoinColumn({ name: 'type_id' })
    type: OperationTypes

    @ManyToOne(() => User, (user) => user.operations)
    @JoinColumn({ name: 'user_id' })
    user: User
}