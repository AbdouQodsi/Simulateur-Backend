import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlannerModule } from './planner/planner.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinderModule } from './finder/finder.module';
import { Planner } from './planner/entities/planner.entity';
import { Finder } from './finder/entities/finder.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Planner, Finder],
      synchronize: true,
      ssl: {
        rejectUnauthorized: true,
      },
    }),
    PlannerModule,
    FinderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
