import { IAdminRepository } from "../../domain/repositories/medic.admin.repository.js";
import { ReservationDto, ReservationsResponseDto, TimeBlockDto, TimeBlockResponseDto } from "../dtos/admin.timeBlock.dto.js";

export class MedicAdminService {
    constructor(private readonly adminRepository: IAdminRepository) {}


    createTimeblock = async (dto: TimeBlockDto): Promise<TimeBlockResponseDto>  => {
        if(dto.userRole !== 'ADMIN') {
            throw new Error("Access denied");
        }
        
        const newTimeBlock = await this.adminRepository.createTimeBlock(dto.startTime, dto.endTime);
        if(!newTimeBlock) {
            throw new Error("Error creating time block service");
        }

        return { newTimeBlock };
    }

    listReservation = async (role: string): Promise<ReservationsResponseDto> => {
        if(role !== 'ADMIN') {
            throw new Error("Access denied");
        }
        
        const reservations = await this.adminRepository.listReservation();

        if(!reservations) {
            throw new Error("Error fetching reservations from service");
        }

        return { reservations };
        
    }
}

