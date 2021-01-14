import * as moyooshi_service from "../service/moyooshi_service";
import { MoyooshiServiceOutputDto } from "../service/moyooshi_service";
import * as endecode from "../helper/endecode";

export const getMoyooshi = async (schedule_update_id: number) => {
    // const moyooshiId: number = endecode.decodeFromScheduleUpdateId(schedule_update_id);
    const result: MoyooshiServiceOutputDto = await moyooshi_service.readMoyooshi(schedule_update_id);
    return result;
};
