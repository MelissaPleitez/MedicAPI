import { ReservationsResponseDto } from "../dtos/admin.timeBlock.dto.js";
import { CreateReservationData} from "../dtos/reservation.dto.js";


export interface IReservationService {
    createReservation(dto: CreateReservationData): Promise<ReservationsResponseDto>;
    findReservation(id: number): Promise<ReservationsResponseDto>;
    updateReservationComplete(id:number, dto: CreateReservationData): Promise<ReservationsResponseDto>;
    deleteReservation(id: number): Promise<string>;
  }