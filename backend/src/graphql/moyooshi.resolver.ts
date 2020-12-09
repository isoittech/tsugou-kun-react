import "reflect-metadata";
import { Resolver, Mutation, Arg, InputType, Field, Query } from "type-graphql";
import Moyooshi from "../models/moyooshi";
import * as endecode from "../helper/endecode";
import { MoyooshiServiceOutputDto } from "../service/moyooshi_service";
import * as moyooshi_service from "../service/moyooshi_service";

@InputType()
export class MoyooshiInput implements Partial<Moyooshi> {
    @Field()
    schedule_update_id!: string;
}

@Resolver((of) => Moyooshi)
export class MoyooshiResolver {
    @Query((returns) => Moyooshi)
    async Moyooshi(@Arg("schedule_update_id") schedule_update_id: string) {
        const moyooshiId: number = endecode.decodeFromScheduleUpdateId(schedule_update_id);
        const serviceOutput: MoyooshiServiceOutputDto = await moyooshi_service.readMoyooshi(moyooshiId);
        return Promise.resolve(serviceOutput.moyooshi);
    }

    // @Mutation((returns) => Moyooshi)
    // addMoyooshi(@Arg("Moyooshi") MoyooshiInput: MoyooshiInput): Promise<Moyooshi> {
    //     const moyooshi: Moyooshi = new Moyooshi("name", "kana");

    //     return Promise.resolve(moyooshi);
    // }
}
