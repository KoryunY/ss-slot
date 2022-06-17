import { Slot } from './slot.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
export declare class SlotService {
    private repo;
    private client;
    constructor(repo: Repository<Slot>, client: ClientProxy);
    genRandomNumber(): Promise<Slot>;
}
