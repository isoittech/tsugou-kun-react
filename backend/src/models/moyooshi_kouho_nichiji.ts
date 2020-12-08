import { Table, Column, Model, HasMany, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";
import Moyooshi from "./moyooshi";
import SankaNichiji from "./sanka_nichiji";

@ObjectType()
@Table({ tableName: "moyooshi_kouho_nichijis" })
export default class MoyooshiKouhoNichiji extends Model<MoyooshiKouhoNichiji> {
    @Field()
    @Column(DataType.TEXT)
    kouho_nichiji!: string;

    @Field()
    @Column(DataType.TEXT)
    schedule_update_id?: string;

    @Field((type) => [SankaNichiji])
    @HasMany(() => SankaNichiji)
    sankaNichiji!: SankaNichiji[];

    @Field()
    @ForeignKey(() => Moyooshi)
    moyooshi_id!: number;

    @Field((type) => Moyooshi)
    @BelongsTo(() => Moyooshi)
    moyooshi!: Moyooshi;
}
