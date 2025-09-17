import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

const statusIdActive = 100;
@Entity('auths')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ type: 'text' })
  access_token: string;

  @Column({ type: 'text' })
  refresh_token: string;

  @Column({ default: statusIdActive })
  status: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  access_expires_at: Date;

  @Column({ type: 'timestamp' })
  refresh_expires_at: Date;

  @ManyToOne(() => User, (user) => user.auths)
  @JoinColumn({ name: 'user_id' })
  user: User
}