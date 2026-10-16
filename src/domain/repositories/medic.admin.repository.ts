import { ReservationsResponseDto } from '../../application/dtos/admin.timeBlock.dto.js';
import { TimeBlockEntity } from '../entities/medic.timeBlock.entity.js';


export interface IAdminRepository {
  createTimeBlock(startTime: Date, endTime: Date): Promise<TimeBlockEntity>;
  listReservation(): Promise<ReservationsResponseDto>;
}