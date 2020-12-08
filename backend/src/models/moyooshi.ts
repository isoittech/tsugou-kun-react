import "reflect-metadata";
import { Table, Column, Model, HasMany, DataType } from "sequelize-typescript";
import { ObjectType, Field } from "type-graphql";

import MoyooshiKouhoNichiji from "./moyooshi_kouho_nichiji";
import Sankasha from "./sankasha";

@ObjectType()
@Table
export default class Moyooshi extends Model<Moyooshi> {
    @Field()
    @Column(DataType.TEXT)
    name!: string;

    @Field()
    @Column(DataType.TEXT)
    memo?: string;

    @Field()
    @Column(DataType.TEXT)
    schedule_update_id!: string;

    @Field((type) => [Sankasha])
    @HasMany(() => Sankasha)
    sankashas?: Sankasha[];

    @Field((type) => [MoyooshiKouhoNichiji])
    @HasMany(() => MoyooshiKouhoNichiji)
    moyooshiKouhoNichijis!: MoyooshiKouhoNichiji[];
}
