import { Router } from "express";
import authRouter from './medic.auth.routes.js';
import adminRouter from './medic.admin.routes.js';
import reservationRouters from './medic.reservation.routes.js';
import appointmentRouters from "./medic.appointment.routes.js";

const router = Router();

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/reservation', reservationRouters);
router.use('/users', appointmentRouters)

export default router;