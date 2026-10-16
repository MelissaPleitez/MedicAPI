import { CreateReservationData } from "../../application/dtos/reservation.dto.js";
import { AppointmentEntity } from "../entities/medic.appointment.entity.js";

export interface IReservationRepository{
    createReservation(reservation: CreateReservationData): Promise<AppointmentEntity>;
    findById(id: number): Promise<AppointmentEntity | null>;
    updateReservation(id: number, reservation: CreateReservationData): Promise<AppointmentEntity>;
    deleteReservation(id: number): Promise<AppointmentEntity | string>;
}