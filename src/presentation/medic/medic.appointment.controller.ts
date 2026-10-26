import { Request, Response} from "express";
import { IAppointmentService } from "../../application/interfaces/medic.appointment.service.interface.js";

export class MedicAppointmentController {
    constructor(
        private readonly appointmentService: IAppointmentService
    ){}

    getAppointments = async (req: Request, res: Response) => {
        try {
            const idParam = req.params.id as string;
            const userId = parseInt(idParam, 10);
            const appointments = await this.appointmentService.getUserAppointments({userId});
            res.status(201).json(appointments)
        } catch (error) {
            res.status(500).json({error: (error as Error).message });
        }
    }

    
}