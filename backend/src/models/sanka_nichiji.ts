import { Table, Column, Model, DataType, BelongsTo, Default, ForeignKey } from "sequelize-typescript";
import MoyooshiKouhoNichiji from "./moyooshi_kouho_nichiji";
import Sankasha from "./sankasha";

@Table({ tableName: "sanka_nichijis" })
export default class SankaNichiji extends Model<SankaNichiji> {
    @Default("mikaitou")
    @Column({ type: DataType.ENUM, values: ["mikaitou", "maru", "sankaku", "batsu"] }) // @Columnはプロパティの直前にしないとエラーになる。
    sanka_kahi!: string;

    @Column(DataType.BIGINT)
    moyooshi_kouho_nichiji_id!: number;

    @ForeignKey(() => Sankasha)
    sankasha_id!: number;

    @BelongsTo(() => Sankasha)
    Sankasha!: Sankasha;

    @ForeignKey(() => MoyooshiKouhoNichiji)
    moyooshiKouhoNichijiId!: number;

    @BelongsTo(() => MoyooshiKouhoNichiji)
    MoyooshiKouhoNichiji!: MoyooshiKouhoNichiji;
}
