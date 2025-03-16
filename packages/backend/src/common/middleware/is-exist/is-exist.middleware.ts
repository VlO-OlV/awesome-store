import { PrismaService } from '@/database/prisma.service';
import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PrismaEntityName } from './prisma-entity.type';
import { EntityNotFoundException } from '@/common/exceptions/entity-not-found.exception';

@Injectable()
export class IsExistMiddleware implements NestMiddleware {
	constructor(private prisma: PrismaService) {}

	use(entityName: PrismaEntityName, paramName: string) {
		return async (
			request: Request,
			response: Response,
			next: NextFunction,
		) => {
			const param = request.params[paramName];
			if (!param) {
				throw new NotFoundException(`Param ${paramName} is not found`);
			}

			const entity = await (this.prisma[entityName] as any).findFirst({
				where: {
					id: param,
				},
			});
			if (!entity) {
				const errorEntityName =
					entityName[0].toUpperCase() + entityName.slice(1);
				throw new EntityNotFoundException(errorEntityName, 'id');
			}

			next();
		};
	}
}
