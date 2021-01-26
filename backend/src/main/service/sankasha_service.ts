import { sequelize } from "../db/config";
import Sankasha from "../models/sankasha";
import { logger } from "../helper/logging";
import Moyooshi from "../models/moyooshi";
import MoyooshiKouhoNichiji from "../models/moyooshi_kouho_nichiji";
import { SankaKahi, SankashaServiceDto, SankashaServiceOutputDto } from "../types";
import SankaNichiji from "../models/sanka_nichiji";

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
            addedSankasha: updatedSankasha,
            addedSankashaNichijis: addedSankaNichijis,
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
