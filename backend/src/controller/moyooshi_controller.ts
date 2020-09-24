import * as Express from 'express';
import * as moyooshi_service from '../service/moyooshi_service'
// @ts-ignore
import models from '../models';
import {MoyooshiServiceDto, MoyooshiServiceOutputDto} from "../service/moyooshi_service";

const router = Express.Router();

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ■機能
// トップページ用コントローラ
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
router.post('/moyooshi', async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {

    const {name, memo, nichiji_kouho} = req.body;
    const moyooshiServiceDto: MoyooshiServiceDto = {
        name: name,
        memo: memo,
        nichiji_kouho: nichiji_kouho,
    }

    const result: MoyooshiServiceOutputDto = await moyooshi_service.createMoyooshi(moyooshiServiceDto)

    return result.error_name || result.error_message
        ? res.status(500).json(
            {
                message: result.error_message,
                value: result.error_name
            }
        )
        : res.status(200).json(
            {
                message: 'Yeah! Yeah!.',
                value: result
            }
        );
});

export default router;