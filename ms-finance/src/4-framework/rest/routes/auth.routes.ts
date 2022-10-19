import { IInputCreateTokenDto } from '@/2-business/types/authentication/create-token.dto';
import { LoginController } from '@/3-presentation/controllers/auth/login.controller';
import { restRouteAdapter } from '@/4-framework/adapters';
import { Controller, Res, Body, Post } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthRoutes {
  constructor(private readonly loginController: LoginController) {}

  @Post('rest')
  public async login(@Body() body: IInputCreateTokenDto, @Res() res: Response) {
    return restRouteAdapter(this.loginController)(body, res);
  }
}
