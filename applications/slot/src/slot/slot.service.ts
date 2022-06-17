import { Injectable, Inject } from '@nestjs/common';
import { Slot } from './slot.entity';
import { Repository } from 'typeorm';
import { RmClient } from './rm-client.service';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class SlotService {

    constructor(
        private client: RmClient,
        @InjectRepository(Slot) private repo: Repository<Slot>,
    ) { }

    async genRandomNumber(): Promise<Slot> {
        const num = await this.client.send();
        const slot = this.repo.create({ random: num });
        return this.repo.save(slot);
    }
}
