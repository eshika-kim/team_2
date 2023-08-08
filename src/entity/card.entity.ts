import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { List } from './list.entity';
export enum StateEnum {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
}

@Entity({ schema: 'team2', name: 'card' })
export class Card {
  @PrimaryGeneratedColumn()
  card_id: number;

  @ManyToOne(() => List, (list) => list.list_id)
  list_id: number;

  @Column('varchar', { length: 10 })
  name: string;

  @Column('varchar', { length: 10 })
  color: string;

  @Column('varchar', { length: 100 })
  description: string;

  @Column({ type: 'timestamp' })
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
