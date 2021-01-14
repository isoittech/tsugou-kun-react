import * as endecode from "../helper/endecode";
import { sequelize } from "../db/config";
import MoyooshiKouhoNichiji from "../models/moyooshi_kouho_nichiji";
import Moyooshi from "../models/moyooshi";
import { logger } from "../helper/logging";

export const createMoyooshi = async (moyooshiServiceDto: MoyooshiServiceDto): Promise<MoyooshiServiceOutputDto> => {
    logger.info("[START]createMoyooshi()");
    const t = await sequelize.transaction();

    try {
        // managed transactionが正常に動作しない（同期的に実行されない）ため、unmanagedでコミット・ロールバックする。
        // const {addedMoyooshi, scheduleUpdateId} = await sequelize.transaction(async (t: Transaction): Moyooshi => {

        // ===================================================
        // 保存対象モデルデータ作成
        // ===================================================
        const moyooshiModel = {
            name: moyooshiServiceDto.name,
            memo: moyooshiServiceDto.memo,
        };

        // ===================================================
        // 保存処理 #1
        // ※2つに分けている理由：新規登録の場合、一旦保存しないとPKが採番されないため。
        // ===================================================
        const addedMoyooshi: Moyooshi = await Moyooshi.create(moyooshiModel, { transaction: t });

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
        const addedMoyooshiKouhoNichijis: MoyooshiKouhoNichiji[] = [];
        moyooshiServiceDto.nichiji_kouho.forEach((nichiji_kouho_elm) => {
            const moyooshiKouhoNichiji = {
                kouho_nichiji: nichiji_kouho_elm,
                moyooshi_id: addedMoyooshi.id,
                schedule_update_id: scheduleUpdateId,
            } as MoyooshiKouhoNichiji;
            addedMoyooshiKouhoNichijis.push(moyooshiKouhoNichiji);
        });

        // ===================================================
        // 保存処理 #2
        // ===================================================
        if (addedMoyooshiKouhoNichijis.length != 0) {
            await MoyooshiKouhoNichiji.bulkCreate(addedMoyooshiKouhoNichijis, { transaction: t });
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
        logger.error(`[ERROR]createMoyooshiでエラーが発生。${JSON.stringify(error)}`);

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
    logger.info("[START]updateMoyooshi()");
    const t = await sequelize.transaction();

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
        } as Moyooshi;

        // ------------------------
        // 削除対象のイベント日時候補ID調査
        // ------------------------
        const deleteTargetInfos = moyooshiServiceDto.deleted_nichiji_kouho;
        const deleteTargetIds: number[] = [];
        for (const id_del_eve_dt_kouho_id of deleteTargetInfos) {
            deleteTargetIds.push(Number(id_del_eve_dt_kouho_id));
        }

        // ------------------------
        // 追加対象イベント日時候補
        // ------------------------
        const addedMoyooshiKouhoNichijis: MoyooshiKouhoNichiji[] = [];
        moyooshiServiceDto.nichiji_kouho.forEach((nichiji_kouho_elm) => {
            const moyooshiKouhoNichiji = {
                kouho_nichiji: nichiji_kouho_elm,
                moyooshi_id: moyooshiModel.id,
                schedule_update_id: scheduleUpdateId,
            } as MoyooshiKouhoNichiji;
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
            await MoyooshiKouhoNichiji.destroy({
                where: {
                    id: deleteTargetIds,
                },
                transaction: t,
            });
        }
        logger.debug("[DONE]イベント日時候補（レコード削除）");

        // ------------------------
        // イベント
        // ------------------------
        logger.debug(`[DO]イベント（更新）, id:${moyooshiModel.id}`);
        await Moyooshi.update(moyooshiModel, {
            where: { id: moyooshiModel.id },
            transaction: t,
        });
        logger.debug(`[DONE]イベント（更新）, id:${moyooshiModel.id}`);

        // ------------------------
        // イベント日時候補
        // ------------------------
        if (addedMoyooshiKouhoNichijis.length != 0) {
            await MoyooshiKouhoNichiji.bulkCreate(addedMoyooshiKouhoNichijis, { transaction: t });
        }
        logger.debug("[DONE]イベント日時候補（追加）");

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

        const moyooshi: Moyooshi | null = await Moyooshi.findByPk(moyooshiServiceDto.id, {
            include: [{ model: MoyooshiKouhoNichiji }],
        });
        if (moyooshi === null) {
            throw Error(`[ERROR]Moyooshのデータ取得に失敗しました。 moyooshiServiceDto.id:${moyooshiServiceDto.id}`);
        }

        // ===================================================
        // 終了処理
        // ===================================================
        return {
            moyooshi: moyooshi,
            nichiji_kouhos: moyooshi.moyooshiKouhoNichijis,
            schedule_update_id: moyooshi.schedule_update_id,
        } as MoyooshiServiceOutputDto;
    } catch (error) {
        await t.rollback();
        logger.error(`[ERROR]updateMoyooshiでエラーが発生。${JSON.stringify(error)}`);

        return {
            error_name: error.name,
            error_message: error.message,
        } as MoyooshiServiceOutputDto;
    }
};

export const readMoyooshi = async (moyooshiId: number): Promise<MoyooshiServiceOutputDto> => {
    logger.info("[START]readMoyooshi()");
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

        const moyooshi: Moyooshi | null = await Moyooshi.findByPk(moyooshiId, {
            include: [{ model: MoyooshiKouhoNichiji }],
        });
        if (moyooshi === null) {
            throw Error(`[ERROR]Moyooshのデータ取得に失敗しました。 moyooshId:${moyooshiId}`);
        }

        // ===================================================
        // 終了処理
        // ===================================================
        logger.info("[END]readMoyooshi()");
        return {
            moyooshi: moyooshi,
            nichiji_kouhos: moyooshi.moyooshiKouhoNichijis,
            schedule_update_id: moyooshi.schedule_update_id,
        } as MoyooshiServiceOutputDto;
    } catch (error) {
        logger.error(`[ERROR]readMoyooshiでエラーが発生。${JSON.stringify(error)}`);

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
    moyooshi?: Moyooshi;
    error_name?: string;
    error_message?: string;
    schedule_update_id?: string;
    nichiji_kouhos?: MoyooshiKouhoNichiji[];
};
