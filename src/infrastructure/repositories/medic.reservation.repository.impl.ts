import { CreateReservationData } from "../../application/dtos/reservation.dto.js";
import { AppointmentEntity } from "../../domain/entities/medic.appointment.entity.js";
import { IReservationRepository } from "../../domain/repositories/medic.reservation.repository.js";
import prisma from "../database/prisma.client.js";

export class MedicReservationRepository implements IReservationRepository {
    
    createReservation = async(data: CreateReservationData): Promise<AppointmentEntity>  => {

        const conflict = await prisma.appointment.findFirst({
            where: {
                date: data.date,
                timeBlockId: data.timeBlockId,
            }
        })

        if(conflict){
            throw new Error('The date is already taken');
        }

        const newReservation = await prisma.appointment.create({
            data: {
                date: data.date,
                userId: data.userId,
                timeBlockId: data.timeBlockId,
            },
            include: {
                user: true,
                timeBlock: true,
            }
        });

        return newReservation as unknown as AppointmentEntity;
        

    }

    findById = async (id: number): Promise<AppointmentEntity | null> => {
        const found = await prisma.appointment.findUnique({ where: { id } });
        return found as unknown as AppointmentEntity;
    }

    updateReservation =  async (id: number, data: CreateReservationData): Promise<AppointmentEntity> => {
        const conflict = await prisma.appointment.findFirst({
            where: {
                date: data.date,
                timeBlockId: data.timeBlockId,
                id: { not: id}
            }
        })


        if(conflict){
            throw new Error('The date requested is already taken');
        }

        const updateReservation = await prisma.appointment.update({
            where: { id: id },
            data
        });

        return updateReservation as unknown as AppointmentEntity;
    }

    deleteReservation = async (id: number): Promise<AppointmentEntity> => {

        const deleted = await prisma.appointment.delete({
            where: { id }
        });
    
        return deleted as unknown as AppointmentEntity;
    }
}