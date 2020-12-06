import { Table, Column, Model, HasMany, DataType } from "sequelize-typescript";
import MoyooshiKouhoNichiji from "./moyooshi_kouho_nichiji";
import Sankasha from "./sankasha";

@Table
export default class Moyooshi extends Model<Moyooshi> {
    @Column(DataType.TEXT)
    name!: string;

    @Column(DataType.TEXT)
    memo?: string;

    @Column(DataType.TEXT)
    schedule_update_id!: string;

    @HasMany(() => Sankasha)
    sankashas?: Sankasha[];

    @HasMany(() => MoyooshiKouhoNichiji)
    moyooshiKouhoNichijis!: MoyooshiKouhoNichiji[];
}
