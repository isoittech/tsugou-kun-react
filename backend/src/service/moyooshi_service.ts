import {Transaction} from "sequelize/types/lib/transaction";
// @ts-ignore
import models from '../models'
import * as endecode from '../helper/endecode'

const db = require('../models/index');


export const createMoyooshi = async (moyooshiServiceDto: MoyooshiServiceDto): Promise<MoyooshiServiceOutputDto> => {
    try {

        const {addedMoyooshi, scheduleUpdateId} = await db.sequelize.transaction(
            async (t: Transaction): models.Moyooshi => {

                // ===================================================
                // 保存対象モデルデータ作成
                // ===================================================
                const moyooshiModel = {
                    name: moyooshiServiceDto.name,
                    memo: moyooshiServiceDto.memo
                } as models.Moyooshi;

                // ===================================================
                // 保存処理 #1
                // ※2つに分けている理由：新規登録の場合、一旦保存しないとPKが採番されないため。
                // ===================================================
                const addedMoyooshi: models.Moyooshi = await models.Moyooshi.create(
                    moyooshiModel,
                    {transaction: t}
                );

                // ===================================================
                // 保存対象データ設定処理
                // ===================================================
                // ------------------------
                // イベント
                // ------------------------
                // スケジュール更新ページID
                const scheduleUpdateId: string = endecode.createScheduleUpdateId(addedMoyooshi.id)
                addedMoyooshi.schedule_update_id = scheduleUpdateId

                // ------------------------
                // イベント日時候補
                // ------------------------
                const addedMoyooshiKouhoNichijis: models.MoyooshiKouhoNichiji[] = []
                moyooshiServiceDto.nichiji_kouho.forEach((nichiji_kouho_elm) => {
                    const moyooshiKouhoNichiji = {
                        kouho_nichiji: nichiji_kouho_elm,
                        moyooshi_id: addedMoyooshi.id,
                        schedule_update_id: scheduleUpdateId,
                    } as models.MoyooshiKouhoNichiji;
                    addedMoyooshiKouhoNichijis.push(moyooshiKouhoNichiji);
                });

                // ===================================================
                // 保存処理 #2
                // ===================================================
                if (addedMoyooshiKouhoNichijis.length != 0) {
                    await models.MoyooshiKouhoNichiji.bulkCreate(
                        addedMoyooshiKouhoNichijis,
                        {transaction: t}
                    );
                }

                return {addedMoyooshi, scheduleUpdateId};

            });

        return {
            added_moyooshi: addedMoyooshi,
            schedule_update_id: scheduleUpdateId
        } as MoyooshiServiceOutputDto;


    } catch (error) {
        console.log(`[ERROR]createMoyooshiでエラーが発生。${JSON.stringify(error)}`)

        return {
            error_name: error.name,
            error_message: error.message,
        } as MoyooshiServiceOutputDto;

    }
};

export type MoyooshiServiceDto = {
    name: string;
    memo?: string;
    nichiji_kouho: string[];
};

export type MoyooshiServiceOutputDto = {
    added_moyooshi?: models.Moyooshi,
    error_name?: string,
    error_message?: string,
    schedule_update_id?: string;
};