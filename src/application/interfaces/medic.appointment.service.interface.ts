import { AppointmentDto, AppointmentResponseDto } from "../dtos/appointment.dto.js";

export interface IAppointmentService {
    getUserAppointments(dto: AppointmentDto): Promise<AppointmentResponseDto>;
}