import { ReservationDto, ReservationsResponseDto, TimeBlockDto, TimeBlockResponseDto } from "../dtos/admin.timeBlock.dto.js";


export interface IAdminService {
    createTimeblock(dto: TimeBlockDto): Promise<TimeBlockResponseDto>;
    listReservation(dto: ReservationDto): Promise<ReservationsResponseDto>;
  }