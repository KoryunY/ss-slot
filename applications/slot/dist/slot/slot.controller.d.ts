import { SlotService } from './slot.service';
export declare class SlotController {
    private slotService;
    constructor(slotService: SlotService);
    genNum(): Promise<import("./slot.entity").Slot>;
}
