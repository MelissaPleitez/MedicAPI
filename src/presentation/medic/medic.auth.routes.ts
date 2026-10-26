import { Router , Request, Response} from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { MedicAuthController } from './medic.auth.controller.js'
import { MedicAuthService } from "../../application/services/medic.auth.service.js";
import { UserRepositoryImpl } from "../../infrastructure/repositories/medic.user.repository.impl.js";


const authRouter = Router();

// 1.
const userRepository = new UserRepositoryImpl();

// 2. 
const authService = new MedicAuthService(userRepository);

// 3. 
const authController = new MedicAuthController(authService);

// 4. 
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

authRouter.get('/protected-route', authenticateToken, (req: Request, res: Response) => {
    res.send('this is a protected root');
})

export default authRouter;