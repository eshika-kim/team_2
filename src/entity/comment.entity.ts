import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Card } from './card.entity';

@Entity({ schema: 'team2', name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @ManyToOne(() => User, (user) => user.user_id)
  user_id: number;

  @ManyToOne(() => Card, (card) => card.card_id)
  card_id: number;

  @Column('varchar')
  Desc: string;

  @Column('varchar')
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
