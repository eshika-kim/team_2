import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Member } from './member.entity';
import { Waiting } from './waiting.entity';
import { List } from './list.entity';
export enum BoardColor {
  RED = 'red',
  BLUE = 'blue',
  YELLOW = 'yellow',
  GREEN = 'green',
  GREY = 'grey',
}

@Entity({ schema: 'team2', name: 'board' })
export class Board {
  @PrimaryGeneratedColumn()
  board_id: number;

  @OneToMany(() => Member, (member) => member.board_id)
  member: Member[];

  @OneToMany(() => Waiting, (waiting) => waiting.board_id)
  waiting: Waiting[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @OneToMany(() => List, (list) => list.board_id)
  list: List[];

  @Column('varchar', { length: 20 })
  name: string;

  @Column({ type: 'enum', enum: BoardColor })
  color: BoardColor;

  @Column('varchar', { length: 1000 })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
