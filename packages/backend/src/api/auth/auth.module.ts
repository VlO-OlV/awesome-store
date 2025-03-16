import { Module } from '@nestjs/common';
import { AuthConroller } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailModule } from '../email/email.module';
import { AccessModule } from '@/common/guards/access.module';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	controllers: [AuthConroller],
	providers: [AuthService],
	imports: [EmailModule, AccessModule, UserModule, TokenModule, ConfigModule],
})
export class AuthModule {}
