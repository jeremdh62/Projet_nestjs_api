import { SetMetadata } from '@nestjs/common';

export const IsOwnerOrAdmin = (entityName: string) =>
  SetMetadata('entityName', entityName);