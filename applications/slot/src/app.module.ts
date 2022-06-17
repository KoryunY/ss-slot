import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SlotModule } from './slot/slot.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database/database.service';
import { Slot } from './slot/slot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';

@Module({
  imports: [SlotModule,
    DatabaseModule,
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: async (configService: DatabaseService) =>
        Object.assign(configService.dbConfig, {
          entities: [Slot],
        }),
      inject: [DatabaseService],
    }), ConfigModule.forRoot({
      isGlobal: true
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
