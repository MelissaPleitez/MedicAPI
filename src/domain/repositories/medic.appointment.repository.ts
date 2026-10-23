import { AppointmentDto } from "../../application/dtos/appointment.dto.js";
import { AppointmentEntity } from "../entities/medic.appointment.entity.js";

export interface IAppointmentRepository{
    getUserAllAppointments(reservation: AppointmentDto): Promise<AppointmentEntity>;

}