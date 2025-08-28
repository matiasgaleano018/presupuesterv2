import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

const statusIdActive = 100;
@Entity('categories')
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
}