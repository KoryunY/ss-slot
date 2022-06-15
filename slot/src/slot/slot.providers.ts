import { DataSource } from "typeorm";
import { Slot } from "./slot.entity";

export const slotProviders = [{
    provide: 'SLOT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Slot),
    inject: ['DATA_SOURCE'],
},]