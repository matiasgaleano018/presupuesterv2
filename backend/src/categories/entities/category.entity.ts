import { User } from '../../users/entities/user.entity';
import { OperationTypes } from '../../operations/entities/operation-type.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BalanceOperations } from 'src/operations/entities/balance-operation.entity';

const statusIdActive = 100;
@Entity('categories')
@Index(['slug', 'type_id', 'user_id'], { unique: true })
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    @Column()
    label: string;

    @Column()
    type_id : number

    @Column()
    user_id : number

    @Column({ default: statusIdActive })
    status : number

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @ManyToOne(() => OperationTypes, (type) => type.categories)
    @JoinColumn({ name: 'type_id' })
    type: OperationTypes

    @ManyToOne(() => User, (user) => user.categories)
    @JoinColumn({ name: 'user_id' })
    user: User

    @OneToMany(() => BalanceOperations, (operation) => operation.category)
    operations: BalanceOperations[]
}