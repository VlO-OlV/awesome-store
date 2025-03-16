import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get<ConfigService>(ConfigService);
	const port = configService.get<number>('port') as number;

	app.enableCors();

	app.enableVersioning({
		type: VersioningType.URI,
	});
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
		}),
	);

	await app.listen(port);
}
bootstrap();
