import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Member } from './member.entity';
import { Board } from './board.entity';
import { Waiting } from './waiting.entity';
import { Comment } from './comment.entity';

@Entity({ schema: 'team2', name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @OneToMany(() => Board, (board) => board.user_id)
  boards: Board[];
  @OneToMany(() => Member, (member) => member.user_id)
  members: Member[];
  @OneToMany(() => Waiting, (waiting) => waiting.user_id)
  waitings: Waiting[];
  @OneToMany(() => Comment, (comment) => comment.user_id)
  comments: Comment[];

  @Index({ unique: true })
  @Column('varchar')
  id: string;

  @Column('varchar', { length: 10 })
  name: string;

  @Column('varchar', { select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
