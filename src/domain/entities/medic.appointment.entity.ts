import { TimeBlockEntity } from "./medic.timeBlock.entity.js";
import { UserEntity } from "./medic.user.entity.js";

export class AppointmentEntity {
    constructor(
        public readonly id: number,
        public readonly date: Date,
        public readonly user: UserEntity,
        public readonly userId: number,
        public readonly timeBlock: TimeBlockEntity,
        public readonly timeBlockId: number
      ) {}
}