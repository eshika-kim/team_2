import {
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Board } from './board.entity';

@Entity({ schema: 'team2', name: 'waiting' })
export class Waiting {
  @PrimaryColumn()
  @ManyToOne(() => User, (user) => user.user_id)
  user_id: number;

  @PrimaryColumn()
  @ManyToOne(() => Board, (board) => board.board_id)
  board_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
