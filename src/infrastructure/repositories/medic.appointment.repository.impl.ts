import { AppointmentDto } from "../../application/dtos/appointment.dto.js";
import { AppointmentEntity } from "../../domain/entities/medic.appointment.entity.js";
import { IAppointmentRepository } from "../../domain/repositories/medic.appointment.repository.js";
import prisma from "../database/prisma.client.js";

export class MedicAppointmentRepository implements IAppointmentRepository {
    
    getUserAllAppointments = async(data: AppointmentDto): Promise<AppointmentEntity>  => {

        const appointments = await prisma.appointment.findMany({
            where: {
                userId: data.userId,
            },
            include: { timeBlock: true}
        })


        return appointments as unknown as AppointmentEntity;
        

    }

    
}