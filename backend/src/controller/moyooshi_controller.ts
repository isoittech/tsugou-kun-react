import * as Express from 'express';
import * as moyooshi_service from '../service/moyooshi_service'
import {MoyooshiAddRequest} from "./form/moyooshi";
// @ts-ignore
import models from '../models';

const router = Express.Router();

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ■機能
// トップページ用コントローラ
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
router.post('/moyooshi', async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {

    const {name, memo, nichiji_kouho} = req.body;
    const eventModel: models.Moyooshi = {
        name: name,
        memo: memo,
        schedule_update_id: 'dummy'
    }

    const result = await moyooshi_service.createMoyooshi(eventModel)

    res.status(200).json(
        {
            message: 'Yeah! Yeah!.',
            value: result
        }
    );
});

export default router;