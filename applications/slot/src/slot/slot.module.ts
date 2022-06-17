import { Module } from '@nestjs/common';
import { SlotController } from './slot.controller';
import { SlotService } from './slot.service';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RmClient } from './rm-client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot } from './slot.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Slot])
    ,
  ClientsModule.registerAsync([
    {
      name: 'NUM_GENERATOR',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
          queue: configService.get<string>('QUEUE'),
          urls: [configService.get<string>('URL')],
          queueOptions: { durable: false },
        },
      }),
      inject: [ConfigService],
    },
  ]),
  ],
  controllers: [SlotController],
  providers: [
    SlotService,
    RmClient]
})
export class SlotModule { }