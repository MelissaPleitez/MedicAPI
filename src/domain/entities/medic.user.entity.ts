import { Role } from "@prisma/client";

export class UserEntity {
    constructor(
      public readonly id: number,
      public readonly email: string,
      public readonly name: string | null,
      public readonly password: string,
      public readonly role: Role
    ) {}
}