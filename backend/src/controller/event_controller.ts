import * as Express from 'express';
import test from '../service/event_service'

const router = Express.Router();

// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
// ■機能
// トップページ用コントローラ
// ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
router.get('/', async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const result = await test()

    res.status(200).json(
        {
            message: 'Yeah! Yeah!.',
            value: result
        }
    );
});

export default router;