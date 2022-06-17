import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Slot {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    random: number;
}