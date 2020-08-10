import { Router } from 'express';
import { refreshToken } from '../controllers/token_controller';


const router = Router();

router.route('/refresh')
    .post(refreshToken);


export default router;