import { loginControllerInject } from '@/4-framework/common/controller';
import { userRepositoryInject } from '@/4-framework/common/repositories/user-repository.inject';
import { authenticatorServiceInject } from '@/4-framework/common/service/authenticator-service.inject';
import { hasherServiceInject } from '@/4-framework/common/service/hash-service.inject';
import { createTokenUseCase } from '@/4-framework/common/usecases/create-token-usecase.inject';
import { AuthRoutes } from '@/4-framework/rest/routes/auth.routes';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AuthRoutes],
  providers: [
    authenticatorServiceInject,
    userRepositoryInject,
    hasherServiceInject,
    createTokenUseCase,
    loginControllerInject,
  ],
})
export class AuthModule {}
