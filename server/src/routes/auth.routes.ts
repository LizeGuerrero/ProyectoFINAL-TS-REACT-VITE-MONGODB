import express, { Request, Response, NextFunction } from 'express';
import { register, login, logout, verifyAuth } from '../controllers/users/authController';
import { validateRegisterInput } from '../middlewares/validateInput.middleware';

const router = express.Router();

// Define routes with middlewares and controllers
router.post('/register', validateRegisterInput, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await register(req, res);
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await login(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/auth/me', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await verifyAuth(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.post('/logout', logout);

export default router;