import { Module } from '@nestjs/common';
import { ColumnController } from './list.controller';
import { ColumnService } from './list.service';

@Module({
  controllers: [ColumnController],
  providers: [ColumnService]
})
export class ColumnModule {}
