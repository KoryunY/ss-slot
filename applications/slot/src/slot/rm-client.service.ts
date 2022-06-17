import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class RmClient {
    constructor(@Inject('NUM_GENERATOR') private client: ClientProxy) { }

    async send(): Promise<number> {
        const pattern = { cmd: 'num' };
        let observableNum = this.client.send<number>(pattern, 0);
        const resolveNum = await new Promise<number>(resolve => {
            observableNum
                .subscribe(
                    (data: any) => {
                        resolve(data);
                    })
        });
        return resolveNum;
    }
}