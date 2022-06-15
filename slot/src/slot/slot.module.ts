import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SlotController } from './slot.controller';
import { SlotService } from './slot.service';
import { slotProviders } from './slot.providers';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [DatabaseModule, ClientsModule.registerAsync([
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
  ]),],
  controllers: [SlotController],
  providers: [
    ...slotProviders,
    SlotService]
})
export class SlotModule { }