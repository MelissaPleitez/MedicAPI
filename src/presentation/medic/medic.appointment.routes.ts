import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { MedicAppointmentRepository } from "../../infrastructure/repositories/medic.appointment.repository.impl.js";
import { MedicAppointmentService } from "../../application/services/medic.appointment.service.js";
import { MedicAppointmentController } from "./medic.appointment.controller.js";


const appointmentRouters = Router();

// 1.
const appointmentRepository = new MedicAppointmentRepository();

// 2. 
const appointmentService = new MedicAppointmentService(appointmentRepository);

// 3. 
const appointmentController = new MedicAppointmentController(appointmentService);


appointmentRouters.get('/:id/appointments', authenticateToken, appointmentController.getAppointments);


export default appointmentRouters;