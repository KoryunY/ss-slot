import { Controller, Get } from '@nestjs/common';
import { SlotService } from './slot.service';

@Controller('slot')
export class SlotController {
    constructor(private slotService: SlotService) { }

    @Get()
    genNum() {
        return this.slotService.genRandomNumber();
    }
}
