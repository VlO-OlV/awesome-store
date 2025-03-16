import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccessStrategy } from './jwt/access/access.strategy';
import { RefreshStrategy } from './jwt/refresh/refresh.strategy';

@Module({
	imports: [
		ConfigModule,
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>('jwt.secret'),
				signOptions: {
					expiresIn: configService.get<string>('jwt.accessTTL'),
				},
			}),
		}),
	],
	providers: [LocalStrategy, AccessStrategy, RefreshStrategy],
	exports: [JwtModule],
})
export class AccessModule {}
