import { Module } from '@nestjs/common';
import { FinderService } from './finder.service';
import { FinderController } from './finder.controller';
import { Finder } from './entities/finder.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Finder])],
  controllers: [FinderController],
  providers: [FinderService],
})
export class FinderModule {}
