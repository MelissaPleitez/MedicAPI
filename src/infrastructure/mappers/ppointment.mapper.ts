import { AppointmentEntity } from "../../domain/entities/medic.appointment.entity.js";
import { TimeBlockEntity } from "../../domain/entities/medic.timeBlock.entity.js";
import { UserEntity } from "../../domain/entities/medic.user.entity.js";

export class AppointmentMapper {
  static toEntity(raw: any): AppointmentEntity {
    // 1. Mapear UserEntity solo si la relación viene cargada en la consulta
    const userEntity = raw.user
      ? new UserEntity(
          raw.user.id,
          raw.user.email,
          raw.user.name,
          raw.user.password,
          raw.user.role
        )
      : undefined;

    // 2. Mapear TimeBlockEntity solo si la relación viene cargada en la consulta
    const timeBlockEntity = raw.timeBlock
      ? new TimeBlockEntity(
          raw.timeBlock.id,
          raw.timeBlock.startTime,
          raw.timeBlock.endTime
        )
      : undefined;

    // 3. Instanciar pasándole los 6 argumentos exactos requeridos por el constructor
    return new AppointmentEntity(
      raw.id,
      new Date(raw.date),
      userEntity!,
      raw.userId,
      timeBlockEntity!,
      raw.timeBlockId
    );
  }

  static toEntityList(rawList: any[]): AppointmentEntity[] {
    return rawList.map(AppointmentMapper.toEntity);
  }
}