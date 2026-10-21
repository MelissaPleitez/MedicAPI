import { AppointmentEntity } from "../../domain/entities/medic.appointment.entity.js";
import { TimeBlockEntity } from "../../domain/entities/medic.timeBlock.entity.js";
import { IAdminRepository } from "../../domain/repositories/medic.admin.repository.js";
import prisma from "../database/prisma.client.js";
import { AppointmentMapper } from "../mappers/ppointment.mapper.js";


export class MedicAdminRepository implements IAdminRepository {


    async createTimeBlock(startTime: Date, endTime: Date): Promise<TimeBlockEntity>{
        const timeblock = await prisma.timeBlock.create({
            data: {
                startTime: startTime,
                endTime: endTime,
            }
        })

        return new TimeBlockEntity(
            timeblock.id,
            timeblock.startTime,
            timeblock.endTime,
        );
    }

    async listReservation(): Promise<AppointmentEntity[]>{
        const reservations = await prisma.appointment.findMany({
            include: {
                user: true,
                timeBlock: true
            }
        });

        return AppointmentMapper.toEntityList(reservations);
    }
}