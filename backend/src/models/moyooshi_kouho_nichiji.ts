import { Table, Column, Model, HasMany, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import Moyooshi from "./moyooshi";
import SankaNichiji from "./sanka_nichiji";

@Table({ tableName: "moyooshi_kouho_nichijis" })
export default class MoyooshiKouhoNichiji extends Model<MoyooshiKouhoNichiji> {
    @Column(DataType.TEXT)
    kouho_nichiji!: string;

    @Column(DataType.TEXT)
    schedule_update_id?: string;

    @HasMany(() => SankaNichiji)
    sankaNichiji!: SankaNichiji[];

    @ForeignKey(() => Moyooshi)
    moyooshi_id!: number;

    @BelongsTo(() => Moyooshi)
    moyooshi!: Moyooshi;
}
