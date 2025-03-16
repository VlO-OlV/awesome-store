import { NotFoundException } from '@nestjs/common';

export class EntityNotFoundException extends NotFoundException {
	constructor(entity: string, field: string) {
		super(`${entity} with such ${field} is not found`);
	}
}
