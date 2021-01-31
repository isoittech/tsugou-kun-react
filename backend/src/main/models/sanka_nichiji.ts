import { Table, Column, Model, DataType, BelongsTo, Default, ForeignKey } from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";
import { SankaKahiType } from "../types";
import MoyooshiKouhoNichiji from "./moyooshi_kouho_nichiji";
import Sankasha from "./sankasha";

@ObjectType()
@Table({ tableName: "sanka_nichijis" })
export default class SankaNichiji extends Model<SankaNichiji> {
    @Field((type) => SankaKahiType)
    @Default("MIKAITOU")
    @Column({
        type: DataType.ENUM,
        values: [SankaKahiType.MIKAITOU, SankaKahiType.MARU, SankaKahiType.SANKAKU, SankaKahiType.BATSU],
    }) // @Columnはプロパティの直前にしないとエラーになる。
    sanka_kahi!: SankaKahiType;

    @Field()
    @ForeignKey(() => Sankasha)
    sankasha_id!: number;

    @Field()
    @ForeignKey(() => MoyooshiKouhoNichiji)
    moyooshi_kouho_nichiji_id!: number;

    @Field((type) => Sankasha)
    @BelongsTo(() => Sankasha)
    sankasha!: Sankasha;

    @Field((type) => MoyooshiKouhoNichiji)
    @BelongsTo(() => MoyooshiKouhoNichiji)
    moyooshiKouhoNichiji!: MoyooshiKouhoNichiji;
}
