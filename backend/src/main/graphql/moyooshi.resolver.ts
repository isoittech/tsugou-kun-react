import "reflect-metadata";
import { Resolver, Mutation, Arg, InputType, Field, Query } from "type-graphql";

import Moyooshi from "../models/moyooshi";
import * as endecode from "../helper/endecode";
import { MoyooshiServiceDto, MoyooshiServiceOutputDto } from "../service/moyooshi_service";
import * as moyooshi_service from "../service/moyooshi_service";

@InputType()
export class MoyooshiInput {
    @Field()
    name!: string;

    @Field()
    memo: string;

    @Field((type) => [String])
    moyooshiKouhoNichijis!: string[];

    constructor() {
        this.memo = "";
    }
}

@Resolver((of) => Moyooshi)
export class MoyooshiResolver {
    @Query((returns) => Moyooshi)
    async Moyooshi(@Arg("schedule_update_id") schedule_update_id: string) {
        const moyooshiId: number = endecode.decodeFromScheduleUpdateId(schedule_update_id);
        const serviceOutput: MoyooshiServiceOutputDto = await moyooshi_service.readMoyooshi(moyooshiId);
        return Promise.resolve(serviceOutput.moyooshi);
    }

    @Mutation((returns) => Moyooshi)
    async addMoyooshi(@Arg("Moyooshi") moyooshiInput: MoyooshiInput): Promise<Moyooshi> {
        const moyooshiServiceDto: MoyooshiServiceDto = {
            name: moyooshiInput.name,
            memo: moyooshiInput.memo,
            nichiji_kouho: moyooshiInput.moyooshiKouhoNichijis,
        };

        const serviceOutput: MoyooshiServiceOutputDto = await moyooshi_service.createMoyooshi(moyooshiServiceDto);
        serviceOutput.moyooshi!.moyooshiKouhoNichijis = serviceOutput.nichiji_kouhos!;

        return Promise.resolve(serviceOutput.moyooshi!);
    }
}
