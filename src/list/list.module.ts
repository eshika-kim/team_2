import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from 'src/entity/list.entity';
import { Member } from 'src/entity/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([List, Member])],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
