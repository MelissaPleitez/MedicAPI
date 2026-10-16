import { IReservationRepository } from "../../domain/repositories/medic.reservation.repository.js";
import prisma from "../../infrastructure/database/prisma.client.js";
import { ReservationDto, ReservationsResponseDto } from "../dtos/admin.timeBlock.dto.js";
import { CreateReservationData, UpdateReservationDto } from "../dtos/reservation.dto.js";
import { IReservationService } from "../interfaces/medic.reservation.service.interface.js";


export class MedicReservationService implements IReservationService {
    constructor(
        private readonly reservationRepository: IReservationRepository
    ){}

    createReservation = async (dto: CreateReservationData): Promise<ReservationsResponseDto> => {

        const newReservation = await this.reservationRepository.createReservation(dto)
        if(!newReservation) {
            throw new Error("Error creating reservation service");
        }

        return { newReservation };

    }
    
    findReservation = async (id: number): Promise<ReservationsResponseDto> =>{
        const found = await this.reservationRepository.findById(id);

        if(!found) {
            throw new Error("Error reservation was not found");
        }

        return { found };

    }
    
    updateReservationComplete = async (id:number, dto: CreateReservationData): Promise<ReservationsResponseDto> => {

       const newReservation = await this.reservationRepository.updateReservation(id, dto);

       if(!newReservation) {
            throw new Error("Error reservation was not updated");
        }

        return { newReservation };
    };

    deleteReservation = async (id: number): Promise<string> => {
        const deleteReservation = await this.reservationRepository.deleteReservation(id);

        return "the reservation was successfully deleted";
    }
}