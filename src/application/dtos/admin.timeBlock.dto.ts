import { TimeBlockEntity } from "../../domain/entities/medic.timeBlock.entity.js";
import { UserEntity } from "../../domain/entities/medic.user.entity.js";

export interface TimeBlockDto {
    userRole: string
    startTime: Date;
    endTime: Date;
}

export interface TimeBlockResponseDto {
    newTimeBlock: TimeBlockEntity;
}


export interface ReservationDto {

}

export interface ReservationsResponseDto{
    
}