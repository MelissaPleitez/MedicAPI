import { Request, Response} from "express";
import { MedicAuthService } from '../../application/services/medic.auth.service.js'


export class MedicAuthController {
    
    constructor(private readonly authService: MedicAuthService) {}

    register = async (req: Request, res: Response) => {
        try {
            await this.authService.registerUser(req.body);
            return res.status(201).json({ message: "User registered Successfully"});
        } catch (error) {
            return res.status(400).json({error: (error as Error).message });
        }

    }

    login = async (req: Request, res: Response) => {
        try {
            const token = await this.authService.loginUser(req.body);
            res.status(200).json(token);
            
        } catch (error) {
            return res.status(400).json({error: (error as Error).message });
        }
    }

}