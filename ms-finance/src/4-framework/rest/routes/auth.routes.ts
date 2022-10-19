import { LoginController } from '@/3-presentation/controllers/auth/login.controller';
import { CreateTokenSerializer } from '@/3-presentation/serializers/login/create-token.serializer';
import { restRouteAdapter } from '@/4-framework/adapters';
import { Controller, Res, Body, Post } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthRoutes {
  constructor(private readonly loginController: LoginController) {}

  @Post('rest')
  public async login(
    @Body() body: CreateTokenSerializer,
    @Res() res: Response,
  ) {
    return restRouteAdapter(this.loginController)(body, res, {
      status: 200,
      login: false,
      protect: false,
    });
  }
}
