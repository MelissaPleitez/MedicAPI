import { IReservationService } from "../../application/interfaces/medic.reservation.service.interface.js";
import { AuthenticatedRoleRequest } from "../middleware/auth.middleware.js";
import { Request, Response} from "express";

export class MedicReservationController {
    constructor(
        private readonly reservationService: IReservationService
    ){}

    createReservation = async (req: AuthenticatedRoleRequest, res: Response) => {
        try {
            const newReservation = await this.reservationService.createReservation(req.body);
            res.status(201).json(newReservation)
        } catch (error) {
            res.status(400).json({error: (error as Error).message });
        }
    }

    getReservation = async (req: Request, res: Response) => {
        try {

            const idParam = req.params.id as string;
            const id = parseInt(idParam, 10);
            const reservationFound = await this.reservationService.findReservation(id)
            if(!reservationFound){
                res.status(404).json({ error: "Reservation not found" });
            }
            res.status(200).json(reservationFound);
        } catch (error) {
            res.status(400).json({error: (error as Error).message });
        }
    }

    updateReservation = async (req: Request, res: Response) => {
        try {
            const idParam = req.params.id as string;
            const id = parseInt(idParam, 10);
    
            if(isNaN(id)) {
                res.status(400).json({ error: "Invalid reservation ID" });
                return;
              }
          
              const updatedReservation = await this.reservationService.updateReservationComplete(
                id,
                {
                    date: req.body.date,
                    userId: req.body.userId,
                    timeBlockId: req.body.timeBlockId
                }
              );
    
    
            res.status(200).json(updatedReservation);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message  || "Error updating reservation" });
        }
    };

    deleteReservation = async (req: Request, res: Response) => {
        try {
            const idParam = req.params.id as string;
            const id = parseInt(idParam, 10);
            const reservationDeleted = await this.reservationService.deleteReservation(id);

            if(!reservationDeleted){
                res.status(400).json({ error: "Reservation not found" });
                return;
            }

            res.status(200).send();
            
        } catch (error) {
            res.status(500).json({ error: (error as Error).message  || "Error updating reservation" });
        }
    }
}