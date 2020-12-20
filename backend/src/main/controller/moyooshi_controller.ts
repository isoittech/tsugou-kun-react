import * as Express from "express";
import * as moyooshi_service from "../service/moyooshi_service";
import { MoyooshiServiceDto, MoyooshiServiceOutputDto } from "../service/moyooshi_service";
import * as endecode from "../helper/endecode";

const router = Express.Router();

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ■機能
// イベント情報登録用コントローラ
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
router.post("/", async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const { name, memo, nichiji_kouho } = req.body;
    const moyooshiServiceDto: MoyooshiServiceDto = {
        name: name,
        memo: memo,
        nichiji_kouho: nichiji_kouho,
    };

    const result: MoyooshiServiceOutputDto = await moyooshi_service.createMoyooshi(moyooshiServiceDto);

    return result.error_name || result.error_message
        ? res.status(500).json({
              message: result.error_message,
              value: result.error_name,
          })
        : res.status(200).json({
              message: "Yeah! Yeah!.",
              value: result,
          });
});

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ■機能
// イベント情報更新用コントローラ
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
router.put("/", async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const { id, name, memo, nichiji_kouho, deleted_nichiji_kouho, schedule_update_id } = req.body;
    const moyooshiServiceDto: MoyooshiServiceDto = {
        id: id,
        name: name,
        memo: memo,
        nichiji_kouho: nichiji_kouho,
        deleted_nichiji_kouho: deleted_nichiji_kouho,
    };

    const result: MoyooshiServiceOutputDto = await moyooshi_service.updateMoyooshi(
        moyooshiServiceDto,
        schedule_update_id
    );

    return result.error_name || result.error_message
        ? res.status(500).json({
              message: result.error_message,
              value: result.error_name,
          })
        : res.status(200).json({
              message: "Yeah! Yeah!.",
              value: result,
          });
});

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ■機能
// イベント情報取得用コントローラ
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
router.get("/", async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const scheduleUpdateId: string = req.query.schedule_update_id as string;
    const moyooshiId: number = endecode.decodeFromScheduleUpdateId(scheduleUpdateId);

    const result: MoyooshiServiceOutputDto = await moyooshi_service.readMoyooshi(moyooshiId);

    return result.error_name || result.error_message
        ? res.status(500).json({
              message: result.error_message,
              value: result.error_name,
          })
        : res.status(200).json({
              message: "Yeah! Yeah!.",
              value: result,
          });
});

export default router;
