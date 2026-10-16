import { TimeBlockEntity } from "../../domain/entities/medic.timeBlock.entity.js";
import { UserEntity } from "../../domain/entities/medic.user.entity.js";

export interface ReservationDto {
    id: number
    date: Date
    user: UserEntity
    timeBlock: TimeBlockEntity
}

export interface UpdateReservationDto {
    id: number; 
    body?: object;
}

export interface CreateReservationData {
    date: Date;
    userId: number;
    timeBlockId: number;
}

export interface ReservationsResponseDto{
    
}

