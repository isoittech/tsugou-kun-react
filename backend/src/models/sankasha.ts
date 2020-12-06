import { Table, Column, Model, HasMany, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import Moyooshi from "./moyooshi";
import SankaNichiji from "./sanka_nichiji";

@Table
export default class Sankasha extends Model<Sankasha> {
    @Column(DataType.TEXT)
    name!: string;

    @Column(DataType.TEXT)
    comment?: string;

    @HasMany(() => SankaNichiji)
    sankaNichiji!: SankaNichiji[];

    @ForeignKey(() => Moyooshi)
    moyooshi_id!: number;

    @BelongsTo(() => Moyooshi)
    moyooshi!: Moyooshi;
}
