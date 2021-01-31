import { sequelize } from "../db/config";
import Sankasha from "../models/sankasha";
import { logger } from "../helper/logging";
import Moyooshi from "../models/moyooshi";
import MoyooshiKouhoNichiji from "../models/moyooshi_kouho_nichiji";
import { SankaKahi, SankaKahiType, SankashaServiceDto, SankashaServiceOutputDto } from "../types";
import SankaNichiji from "../models/sanka_nichiji";
import { CalculatedSankaNichiji } from "../graphql/sankasha.resolver";

export const createSankasha = async (sankashaServiceDto: SankashaServiceDto): Promise<SankashaServiceOutputDto> => {
    logger.info("[START]createSankasha()");
    const t = await sequelize.transaction();

    try {
        // ===================================================
        // DBデータ取得
        // ===================================================
        // ------------------------
        // イベントテーブル
        // ------------------------
        // ------------------------
        // イベント日時候補テーブル
        // ※同時取得
        // ------------------------
        const moyooshi: Moyooshi | null = await Moyooshi.findByPk(sankashaServiceDto.moyooshiId, {
            include: [{ model: MoyooshiKouhoNichiji }],
        });
        if (moyooshi === null) {
            throw Error(`[ERROR]Moyooshのデータ取得に失敗しました。 moyooshId:${sankashaServiceDto.moyooshiId}`);
        }

        // ===================================================
        // 保存処理 #1
        // ※2つに分けている理由：新規登録の場合、一旦保存しないとPKが採番されないため。
        // ===================================================
        // ------------------------
        // 参加者テーブル
        // ------------------------
        let updatedSankasha: Sankasha;
        if (sankashaServiceDto.sankasha_id) {
            updatedSankasha = await Sankasha.findByPk(sankashaServiceDto.sankasha_id).then((sankasha) => {
                sankasha!.name = sankashaServiceDto.name;
                sankasha!.comment = sankashaServiceDto.comment;
                sankasha!.moyooshi_id = sankashaServiceDto.moyooshiId;
                sankasha!.moyooshi = moyooshi;
                return sankasha!.save({ transaction: t });
            });
        } else {
            const sankashaModel = {
                name: sankashaServiceDto.name,
                comment: sankashaServiceDto.comment,
                moyooshi_id: sankashaServiceDto.moyooshiId,
                moyooshi: moyooshi,
            } as Sankasha;

            updatedSankasha = await Sankasha.create(sankashaModel, { transaction: t });
        }
        logger.debug("[DONE]参加者テーブルレコード削除");

        // ------------------------
        // 参加日時テーブル
        // ------------------------
        // 更新時における古いデータを消す。更新対象データを特定する処理が面倒なので消して、あとで追加。
        await SankaNichiji.destroy({
            where: {
                sankasha_id: updatedSankasha.id,
            },
            transaction: t,
        });
        logger.debug("[DONE]参加日時候補テーブルレコード削除");

        // ===================================================
        // 保存処理 #2
        // ===================================================
        // ------------------------
        // 参加日時テーブル
        // ※参加日時レコードをイベント候補日時レコード数分作成（下記をループで実行）
        // ・参加日時レコード生成
        // ・POSTデータから参加可否の値を取得、レコードに設定
        //   ※もし回答していない日時があればその日時は0（未入力）とする。
        // ・イベント候補日時テーブルレコードと参加者テーブルレコードもレコードに設定
        // ------------------------

        const addedSankaNichijis: SankaNichiji[] = moyooshi.moyooshiKouhoNichijis.map((moyooshiKouhoNichiji) => {
            const sankaNichiji = {
                sanka_kahi: "MIKAITOU",
                moyooshi_kouho_nichiji_id: moyooshiKouhoNichiji.id,
                sankasha_id: updatedSankasha.id,
                sankasha: updatedSankasha,
                moyooshiKouhoNichiji: moyooshiKouhoNichiji,
            } as SankaNichiji;

            const sankaNichijiFound: SankaKahi | undefined = sankashaServiceDto.sankaKahis.find(
                (sankaKahi) => sankaKahi.moyooshiKouhoNichijiId == moyooshiKouhoNichiji.id
            );
            if (sankaNichijiFound) sankaNichiji.sanka_kahi = sankaNichijiFound.sankaKahi!;

            return sankaNichiji;
        });

        // 保存
        await SankaNichiji.bulkCreate(addedSankaNichijis, { transaction: t });

        await t.commit();

        // ===================================================
        // 終了処理
        // ===================================================
        return {
            sankasha: updatedSankasha,
            sankashaNichijis: addedSankaNichijis,
        } as SankashaServiceOutputDto;
    } catch (error) {
        await t.rollback();
        logger.error(`[ERROR]createSankashaでエラーが発生。${JSON.stringify(error)}`);

        return {
            error_name: error.name,
            error_message: error.message,
        } as SankashaServiceOutputDto;
    }
};

export const readSankashas = async (moyooshiId: number): Promise<SankashaServiceOutputDto> => {
    logger.info("[START]readSankashas()");
    try {
        // ===================================================
        // DBデータ取得
        // ===================================================
        // ------------------------
        // 参加者テーブル
        // ------------------------
        // ------------------------
        // 参加日時テーブル
        // ※同時取得
        // ------------------------

        const sankashas: Sankasha[] | null = await Sankasha.findAll({
            where: {
                moyooshi_id: moyooshiId,
            },
            include: [{ model: SankaNichiji }],
        });

        // ===================================================
        // 終了処理
        // ===================================================
        logger.info("[END]readSankashas()");
        return {
            sankashas: sankashas,
        } as SankashaServiceOutputDto;
    } catch (error) {
        logger.error(`[ERROR]readSankashasでエラーが発生。${JSON.stringify(error)}`);

        return {
            error_name: error.name,
            error_message: error.message,
        } as SankashaServiceOutputDto;
    }
};

export const getCalculatedSankanichijis = async (moyooshiId: number): Promise<SankashaServiceOutputDto> => {
    logger.info("[START]getCalculatedSankanichijis()");
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
        // 集計（DBデータ取得もあり）
        // ===================================================
        // 返却用
        const calculatedSankanichijis: CalculatedSankaNichiji[] = [];

        // ------------------------
        // 参加日時テーブル
        // ※集計関数等は使わずループでQueって取得・集計する。ループ回数とヒットするデータが少ない（であろう）ため。
        // ------------------------
        for (let moyooshiKouhoNichiji of moyooshi.moyooshiKouhoNichijis) {
            // async/awaitをforEach内で使っても機能しない！！
            // ※参考：https://qiita.com/frameair/items/e7645066075666a13063
            // moyooshi.moyooshiKouhoNichijis.forEach(async (moyooshiKouhoNichiji) => {
            let [maruCount, sankakuCount, batsuCount, miCount] = [0, 0, 0, 0];
            const sankaNichijis: SankaNichiji[] | null = await SankaNichiji.findAll({
                where: {
                    moyooshi_kouho_nichiji_id: moyooshiKouhoNichiji.id,
                },
            });

            sankaNichijis.forEach((sankaNichiji) => {
                switch (sankaNichiji.sanka_kahi) {
                    case SankaKahiType.MARU:
                        maruCount++;
                        break;
                    case SankaKahiType.SANKAKU:
                        sankakuCount++;
                        break;
                    case SankaKahiType.BATSU:
                        batsuCount++;
                        break;
                    default:
                        miCount++;
                        break;
                }
            });

            calculatedSankanichijis.push({
                moyooshiKouhoNichiji,
                maruCount,
                sankakuCount,
                batsuCount,
            } as CalculatedSankaNichiji);
        }

        // ===================================================
        // 終了処理
        // ===================================================
        logger.info("[END]getCalculatedSankanichijis()");
        return {
            calculatedSankanichijis,
        } as SankashaServiceOutputDto;
    } catch (error) {
        logger.error(`[ERROR]getCalculatedSankanichijisでエラーが発生。${JSON.stringify(error)}`);

        return {
            error_name: error.name,
            error_message: error.message,
        } as SankashaServiceOutputDto;
    }
};
