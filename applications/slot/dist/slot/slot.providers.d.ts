import { DataSource } from "typeorm";
import { Slot } from "./slot.entity";
export declare const slotProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Slot>;
    inject: string[];
}[];
