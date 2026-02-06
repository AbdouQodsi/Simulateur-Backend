import { Module } from '@nestjs/common';
import { PlannerService } from './planner.service';
import { PlannerController } from './planner.controller';
import { Planner } from './entities/planner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Planner])],
  controllers: [PlannerController],
  providers: [PlannerService],
})
export class PlannerModule {}
