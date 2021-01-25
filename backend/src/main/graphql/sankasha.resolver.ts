import "reflect-metadata";
import { Resolver, Mutation, Arg, InputType, Field, Query, ObjectType } from "type-graphql";

import Sankasha from "../models/sankasha";
import * as endecode from "../helper/endecode";
import * as sankasha_service from "../service/sankasha_service";
import { SankashaServiceOutputDto, SankashaServiceDto, SankaKahi, SankaKahiType } from "../types";

@InputType()
export class SankaKahiInput {
    @Field((type) => SankaKahiType)
    sankaKahi!: SankaKahiType;

    @Field()
    moyooshiNichijiKouhoId!: number;
}

@InputType()
export class SankashaInput {
    @Field()
    name!: string;

    @Field()
    comment: string;

    @Field()
    sankashaId: number;

    @Field()
    schedule_update_id: string;

    @Field((type) => [SankaKahiInput])
    sankaKahis!: SankaKahiInput[];

    constructor() {
        this.comment = "";
        this.sankashaId = 0;
        this.schedule_update_id = "";
    }
}

@InputType()
export class UpdateSankashaInput extends SankashaInput {
    @Field()
    schedule_update_id!: string;

    @Field((type) => [String])
    deleted_nichiji_kouho: string[];

    constructor() {
        super();
        this.schedule_update_id = "";
        this.deleted_nichiji_kouho = [];
    }
}

@Resolver((of) => Sankasha)
export class SankashaResolver {
    // @Query((returns) => Sankasha)
    // async Sankasha(@Arg("schedule_update_id") schedule_update_id: string) {
    //     const sankashaId: number = endecode.decodeFromScheduleUpdateId(schedule_update_id);
    //     const serviceOutput: SankashaServiceOutputDto = await sankasha_service.readSankasha(sankashaId);
    //     return Promise.resolve(serviceOutput.sankasha);
    // }
    // export type SankashaServiceDto = {
    //     sankasha_id?: number;
    //     name: string;
    //     comment?: string;
    //     moyooshiId: number;
    //     nichiji_kouho_ids: number[];
    //     sanka_nichijis: SankaNichiji[];
    // };

    @Mutation((returns) => Sankasha)
    async addSankasha(@Arg("Sankasha") sankashaInput: SankashaInput): Promise<Sankasha> {
        const sankashaServiceDto: SankashaServiceDto = {
            sankasha_id: sankashaInput.sankashaId,
            name: sankashaInput.name,
            comment: sankashaInput.comment,
            moyooshiId: endecode.decodeFromScheduleUpdateId(sankashaInput.schedule_update_id),
            sankaKahis: buildSankaNichijis(sankashaInput.sankaKahis),
        };

        const serviceOutput: SankashaServiceOutputDto = await sankasha_service.createSankasha(sankashaServiceDto);
        serviceOutput.addedSankasha!.sankaNichiji = serviceOutput.addedSankashaNichijis;

        return Promise.resolve(serviceOutput.addedSankasha!);
    }

    // @Mutation((returns) => Sankasha)
    // async updateSankasha(@Arg("Sankasha") sankashaInput: UpdateSankashaInput): Promise<Sankasha> {
    //     const scheduleUpdateId: string = sankashaInput.schedule_update_id;
    //     const sankashaId: number = endecode.decodeFromScheduleUpdateId(scheduleUpdateId);
    //     const sankashaServiceDto: SankashaServiceDto = {
    //         id: sankashaId,
    //         name: sankashaInput.name,
    //         memo: sankashaInput.memo,
    //         nichiji_kouho: sankashaInput.moyooshiKouhoNichijis,
    //         deleted_nichiji_kouho: sankashaInput.deleted_nichiji_kouho,
    //     };

    //     const serviceOutput: SankashaServiceOutputDto = await sankasha_service.updateSankasha(
    //         sankashaServiceDto,
    //         scheduleUpdateId
    //     );
    //     serviceOutput.sankasha!.moyooshiKouhoNichijis = serviceOutput.nichiji_kouhos!;

    //     return Promise.resolve(serviceOutput.sankasha!);
    // }
}

const buildSankaNichijis = (sankaKahis: SankaKahiInput[]): SankaKahi[] => {
    return sankaKahis.map((sankaKahiInput) => {
        const sankaKahi: SankaKahi = {
            moyooshiKouhoNichijiId: sankaKahiInput.moyooshiNichijiKouhoId,
            sankaKahi: sankaKahiInput.sankaKahi,
        };
        return sankaKahi;
    });
};
