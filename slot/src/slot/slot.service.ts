import { Injectable, Inject } from '@nestjs/common';
import { Slot } from './slot.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
@Injectable()
export class SlotService {

    constructor(
        @Inject('SLOT_REPOSITORY') private repo: Repository<Slot>,
        @Inject('NUM_GENERATOR') private client: ClientProxy
    ) { }

    async genRandomNumber() {
        const pattern = { cmd: 'num' };
        const observableNum = await this.client.send<number>(pattern, 0);
        let randNumber: number;

        const resolveNum = new Promise<number>(resolve => {
            observableNum
                .subscribe(
                    (data: any) => {
                        resolve(data);
                    })
        });

        await resolveNum.then((data: number) => {
            randNumber = data;
        })

        const slot = this.repo.create({ random: randNumber });
        return this.repo.save(slot);
    }
}
