import { Transaction } from "sequelize/types/lib/transaction";
// @ts-ignore
import models from "../models";
import * as endecode from "../helper/endecode";

const db = require("../models/index");

export const createMoyooshi = async (moyooshiServiceDto: MoyooshiServiceDto): Promise<MoyooshiServiceOutputDto> => {
    const t = await db.sequelize.transaction();

    try {
        // managed transactionが正常に動作しない（同期的に実行されない）ため、unmanagedでコミット・ロールバックする。
        // const {addedMoyooshi, scheduleUpdateId} = await db.sequelize.transaction(async (t: Transaction): models.Moyooshi => {

        // ===================================================
        // 保存対象モデルデータ作成
        // ===================================================
        const moyooshiModel = {
            name: moyooshiServiceDto.name,
            memo: moyooshiServiceDto.memo,
        } as models.Moyooshi;

        // ===================================================
        // 保存処理 #1
        // ※2つに分けている理由：新規登録の場合、一旦保存しないとPKが採番されないため。
        // ===================================================
        const addedMoyooshi: models.Moyooshi = await models.Moyooshi.create(moyooshiModel, { transaction: t });

        // ===================================================
        // 保存対象データ設定処理
        // ===================================================
        // ------------------------
        // イベント
        // ------------------------
        // スケジュール更新ページID
        const scheduleUpdateId: string = endecode.createScheduleUpdateId(addedMoyooshi.id);
        addedMoyooshi.schedule_update_id = scheduleUpdateId;

        // ------------------------
        // イベント日時候補
        // ------------------------
        const addedMoyooshiKouhoNichijis: models.MoyooshiKouhoNichiji[] = [];
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
            await models.MoyooshiKouhoNichiji.bulkCreate(addedMoyooshiKouhoNichijis, { transaction: t });
        }
        // const a = await addedMoyooshi.save(); // このコードだと5回繰り返し実行されたあと、SequelizeTimeoutErrorを起こし異常終了する。原因不明。
        // await addedMoyooshi.save(); // 同上（SequelizeTimeoutErrorを起こし異常終了）
        // const retSaved = addedMoyooshi.save(); // このコードだと正常に終了するように見えるが、ブレークポイントに止まらない。かつ、返却値がPromiseなので使いにくい。
        addedMoyooshi.save();

        await t.commit();

        // ===================================================
        // 終了処理
        // ===================================================
        return {
            moyooshi: addedMoyooshi,
            schedule_update_id: scheduleUpdateId,
            nichiji_kouhos: addedMoyooshiKouhoNichijis,
        } as MoyooshiServiceOutputDto;
    } catch (error) {
        await t.rollback();
        console.log(`[ERROR]createMoyooshiでエラーが発生。${JSON.stringify(error)}`);

        return {
            error_name: error.name,
            error_message: error.message,
        } as MoyooshiServiceOutputDto;
    }
};

export const updateMoyooshi = async (
    moyooshiServiceDto: MoyooshiServiceDto,
    scheduleUpdateId: string
): Promise<MoyooshiServiceOutputDto> => {
    const t = await db.sequelize.transaction();

    try {
        // ===================================================
        // 保存対象モデルデータ作成
        // ===================================================
        // ------------------------
        // イベント
        // ------------------------
        const moyooshiModel = {
            id: moyooshiServiceDto.id,
            name: moyooshiServiceDto.name,
            memo: moyooshiServiceDto.memo,
        } as models.Moyooshi;

        // ------------------------
        // 削除対象のイベント日時候補ID調査
        // ------------------------
        const deleteTargetInfos = moyooshiServiceDto.deleted_nichiji_kouho;
        const deleteTargetIds: number[] = [];
        for (const [key, value] of Object.entries(deleteTargetInfos)) {
            if (key.startsWith("id_del_eve_dt_kouho_id_") && value) {
                deleteTargetIds.push(Number(key.replace("id_del_eve_dt_kouho_id_", "")));
            }
        }

        // ------------------------
        // 追加対象イベント日時候補
        // ------------------------
        const addedMoyooshiKouhoNichijis: models.MoyooshiKouhoNichiji[] = [];
        moyooshiServiceDto.nichiji_kouho.forEach((nichiji_kouho_elm) => {
            const moyooshiKouhoNichiji = {
                kouho_nichiji: nichiji_kouho_elm,
                moyooshi_id: moyooshiModel.id,
                schedule_update_id: scheduleUpdateId,
            } as models.MoyooshiKouhoNichiji;
            addedMoyooshiKouhoNichijis.push(moyooshiKouhoNichiji);
        });

        // ===================================================
        // 保存処理
        // ===================================================
        // ------------------------
        // イベント日時候補（レコード削除）
        // ※編集画面にて削除を選択された日時がある場合の処理
        // ※この後のイベント日時レコード追加前に掃除
        // ------------------------
        if (deleteTargetIds.length != 0) {
            await models.MoyooshiKouhoNichiji.destroy(
                {
                    where: {
                        id: deleteTargetIds,
                    },
                },
                { transaction: t }
            );
        }

        // ------------------------
        // イベント
        // ------------------------
        await models.Moyooshi.update(moyooshiModel, {
            where: { id: moyooshiModel.id },
            transaction: t,
        });

        // ------------------------
        // イベント日時候補
        // ------------------------
        if (addedMoyooshiKouhoNichijis.length != 0) {
            await models.MoyooshiKouhoNichiji.bulkCreate(addedMoyooshiKouhoNichijis, { transaction: t });
        }

        await t.commit();

        // ===================================================
        // DBデータ取得
        // ===================================================
        // ------------------------
        // イベントレコード
        // ------------------------
        // ------------------------
        // イベント日時候補レコード
        // ※同時取得
        // ------------------------

        const moyooshi: models.Moyooshi = await models.Moyooshi.findByPk(moyooshiServiceDto.id, {
            include: [{ model: models.MoyooshiKouhoNichiji }],
        });

        // ===================================================
        // 終了処理
        // ===================================================
        return {
            moyooshi: moyooshi,
            nichiji_kouhos: moyooshi.MoyooshiKouhoNichijis,
            schedule_update_id: moyooshi.schedule_update_id,
        } as MoyooshiServiceOutputDto;
    } catch (error) {
        await t.rollback();
        console.log(`[ERROR]updateMoyooshiでエラーが発生。${JSON.stringify(error)}`);

        return {
            error_name: error.name,
            error_message: error.message,
        } as MoyooshiServiceOutputDto;
    }
};

export const readMoyooshi = async (moyooshiId: number): Promise<MoyooshiServiceOutputDto> => {
    try {
        // ===================================================
        // DBデータ取得
        // ===================================================
        // ------------------------
        // イベントレコード
        // ------------------------
        // ------------------------
        // イベント日時候補レコード
        // ※同時取得
        // ------------------------

        const moyooshi: models.Moyooshi = await models.Moyooshi.findByPk(moyooshiId, {
            include: [{ model: models.MoyooshiKouhoNichiji }],
        });

        // ===================================================
        // 終了処理
        // ===================================================
        return {
            moyooshi: moyooshi,
            nichiji_kouhos: moyooshi.MoyooshiKouhoNichijis,
            schedule_update_id: moyooshi.schedule_update_id,
        } as MoyooshiServiceOutputDto;
    } catch (error) {
        console.log(`[ERROR]readMoyooshiでエラーが発生。${JSON.stringify(error)}`);

        return {
            error_name: error.name,
            error_message: error.message,
        } as MoyooshiServiceOutputDto;
    }
};

export type MoyooshiServiceDto = {
    id?: number;
    name: string;
    memo?: string;
    nichiji_kouho: string[];
    deleted_nichiji_kouho?: any /*{ [key: string]: boolean }*/; // TODO anyから相応しい型に直す
};

export type MoyooshiServiceOutputDto = {
    moyooshi?: models.Moyooshi;
    error_name?: string;
    error_message?: string;
    schedule_update_id?: string;
    nichiji_kouhos?: models.MoyooshiKouhoNichiji[];
};
