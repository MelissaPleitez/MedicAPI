import { IAppointmentRepository } from "../../domain/repositories/medic.appointment.repository.js";
import { AppointmentDto, AppointmentResponseDto } from "../dtos/appointment.dto.js";
import { IAppointmentService } from "../interfaces/medic.appointment.service.interface.js";



export class MedicAppointmentService implements IAppointmentService {
    constructor(
        private readonly appointmentRepository: IAppointmentRepository
    ){}

    getUserAppointments = async (dto: AppointmentDto): Promise<AppointmentResponseDto> => {

        const appointments = await this.appointmentRepository.getUserAllAppointments(dto)
        if(!appointments) {
            throw new Error("Error fetching appointments");
        }

        return { appointments };

    }
    
    
}