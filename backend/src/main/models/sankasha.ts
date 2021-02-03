import {
    Table,
    Column,
    Model,
    HasMany,
    DataType,
    BelongsTo,
    ForeignKey,
    AutoIncrement,
    PrimaryKey,
} from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";
import Moyooshi from "./moyooshi";
import SankaNichiji from "./sanka_nichiji";

@ObjectType()
@Table
export default class Sankasha extends Model<Sankasha> {
    @Field()
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.NUMBER)
    id!: number;

    @Field()
    @Column(DataType.TEXT)
    name!: string;

    @Field()
    @Column(DataType.TEXT)
    comment?: string;

    @Field((type) => [SankaNichiji])
    @HasMany(() => SankaNichiji)
    sankaNichiji?: SankaNichiji[];

    @Field()
    @ForeignKey(() => Moyooshi)
    moyooshi_id!: number;

    @Field((type) => Moyooshi)
    @BelongsTo(() => Moyooshi)
    moyooshi!: Moyooshi;
}
