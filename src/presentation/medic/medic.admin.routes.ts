import { Router } from "express";
import { MedicAdminRepository } from "../../infrastructure/repositories/medic.admin.repository.impl.js";
import { MedicAdminService } from "../../application/services/medic.admin.service.js";
import { MedicAdminController } from "./medic.admin.controller.js";
import { authenticateToken, requireRole} from "../middleware/auth.middleware.js";


const adminRouter = Router();

const adminRepository = new MedicAdminRepository();

// 2. 
const adminService = new MedicAdminService(adminRepository);

// 3. 
const adminController = new MedicAdminController(adminService);

adminRouter.post('/time-blocks', authenticateToken, requireRole(['ADMIN']), adminController.timeBlockCreation);
adminRouter.get('/reservations', authenticateToken, requireRole(['ADMIN']), adminController.listReservations)

export default adminRouter;