import { Table, Column, Model, DataType, BelongsTo, Default, ForeignKey } from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";
import MoyooshiKouhoNichiji from "./moyooshi_kouho_nichiji";
import Sankasha from "./sankasha";

@ObjectType()
@Table({ tableName: "sanka_nichijis" })
export default class SankaNichiji extends Model<SankaNichiji> {
    @Field()
    @Default("mikaitou")
    @Column({ type: DataType.ENUM, values: ["mikaitou", "maru", "sankaku", "batsu"] }) // @Columnはプロパティの直前にしないとエラーになる。
    sanka_kahi!: string;

    @Field()
    @Column(DataType.BIGINT)
    moyooshi_kouho_nichiji_id!: number;

    @Field()
    @ForeignKey(() => Sankasha)
    sankasha_id!: number;

    @Field((type) => Sankasha)
    @BelongsTo(() => Sankasha)
    Sankasha!: Sankasha;

    @Field()
    @ForeignKey(() => MoyooshiKouhoNichiji)
    moyooshiKouhoNichijiId!: number;

    @Field((type) => MoyooshiKouhoNichiji)
    @BelongsTo(() => MoyooshiKouhoNichiji)
    MoyooshiKouhoNichiji!: MoyooshiKouhoNichiji;
}
