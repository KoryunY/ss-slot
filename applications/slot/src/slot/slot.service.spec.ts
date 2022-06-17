import { Test, TestingModule } from '@nestjs/testing';
import { RmClient } from './rm-client.service';
import { Slot } from './slot.entity';
import { SlotService } from './slot.service';
import { Repository } from 'typeorm'
import { MqttRecordBuilder } from '@nestjs/microservices';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SlotService', () => {
  let service: SlotService;
  let fakeClientSerivce: Partial<RmClient>;
  let mockedRepo;
  let slots: Slot[];

  beforeEach(async () => {
    slots = [];
    fakeClientSerivce = {
      send: () => {
        const num = Math.floor(Math.random() * 10000);
        return Promise.resolve(num);
      },
    }
    mockedRepo = {
      create: jest.fn((obj: { random: number }) => {
        return {
          id: Math.random(),
          random: obj.random
        }
      }),
      save: jest.fn((obj: Slot) => {
        slots.push(obj);
        return obj;
      })
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlotService, {
        provide: RmClient,
        useValue: fakeClientSerivce,
      }, {
          provide: getRepositoryToken(Slot),
          useValue: mockedRepo
        }],
    }).compile();

    service = module.get<SlotService>(SlotService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return promise with Slot value', () => {
    expect(service.genRandomNumber()).toBeInstanceOf(Promise<Slot>);
  });

  it('should store Slot with number', () => {
    service.genRandomNumber().then(() => {
      expect(slots.length).toEqual(1);
      expect(slots[0]).toBeDefined();
      expect(typeof slots[0].random).toBe('number');
    }
    );
  });
});
