import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { MedicReservationController } from "./medic.reservation.controller.js";
import { MedicReservationRepository } from "../../infrastructure/repositories/medic.reservation.repository.impl.js";
import { MedicReservationService } from "../../application/services/medic.reservation.service.js";

const reservationRouters = Router();

// 1.
const reservationRepository = new MedicReservationRepository();

// 2. 
const reservationService = new MedicReservationService(reservationRepository);

// 3. 
const reservationController = new MedicReservationController(reservationService);

reservationRouters.post('/', authenticateToken, reservationController.createReservation);
reservationRouters.get('/:id', authenticateToken, reservationController.getReservation);
reservationRouters.put('/:id', authenticateToken, reservationController.updateReservation);
reservationRouters.delete('/:id', authenticateToken, reservationController.deleteReservation);

export default reservationRouters;