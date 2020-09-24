import * as Express from 'express';
import createMoyooshi from '../service/event_service'
import {MoyooshiAddRequest} from "./form/event";
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

    console.log("async test log event_controller 1")
    const result = await createMoyooshi(eventModel)
    console.log("async test log event_controller 2")

    res.status(200).json(
        {
            message: 'Yeah! Yeah!.',
            value: result
        }
    );
});

export default router;