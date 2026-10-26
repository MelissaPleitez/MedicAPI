import { MedicAdminService } from "../../application/services/medic.admin.service.js";
import { Response} from "express";
import { AuthenticatedRoleRequest } from "../middleware/auth.middleware.js";

export class MedicAdminController {
    constructor(private readonly adminService: MedicAdminService) {}


    timeBlockCreation = async (req: AuthenticatedRoleRequest, res: Response ) => {
        const { startTime, endTime } = req.body;
        const userRole = req.user?.role;
        if(!userRole){
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        try {
            const newTimeBlock = await this.adminService.createTimeblock({ userRole, startTime, endTime});
            res.status(201).json(newTimeBlock);
        } catch (error) {
            res.status(500).json({ error: "Error creating time block controller"})
        }
    }

    listReservations = async (req: AuthenticatedRoleRequest, res: Response ) => {
        try {
            const user = req.user;
            if (!user) {
                res.status(401).json({ error: "Unauthorized" });
                return;
            }
            console.log('we get the user? ', user);
            const reservations = await this.adminService.listReservation(user.role)
            console.log("are we getting reservations? ", reservations)
            res.status(200).json(reservations);
        } catch (error) {
            res.status(500).json({ error: "Error fetching reservations from controller"})
        }
    }
}
