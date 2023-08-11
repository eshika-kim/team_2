import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { List } from './list.entity';
import { User } from './user.entity';
export enum StateEnum {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
}

@Entity({ schema: 'team2', name: 'card' })
export class Card {
  @PrimaryGeneratedColumn()
  card_id: number;

  @ManyToOne(() => List)
  @JoinColumn({ name: 'list_id' })
  list_id: number;

  @Column('varchar', { length: 10 })
  name: string;

  @Column('varchar', { length: 10 })
  card_color: string;

  @Column('varchar', { length: 100 })
  description: string;

  @Column()
  order: number;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @Column({ type: 'enum', enum: StateEnum, default: StateEnum.TODO })
  state: StateEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
