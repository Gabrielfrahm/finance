import { CreateUserSerializer } from '@/3-presentation/serializers';
import {
  CreateUserController,
  FindOneByUserController,
} from '@/3-presentation/controllers';
import { restRouteAdapter } from '@/4-framework/adapters';
import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { FindAllUserController } from '@/3-presentation/controllers/user/find-all-users.controller';
import { IPagination } from '@/2-business/repositories';

@Controller('users')
export class UserRoutes {
  constructor(
    private readonly createUserController: CreateUserController,
    private readonly findOneByUserController: FindOneByUserController,
    private readonly findAllUserController: FindAllUserController,
  ) {}

  @Post('')
  public async store(@Body() body: CreateUserSerializer, @Res() res: Response) {
    return restRouteAdapter(this.createUserController)(body, res);
  }

  @Get('/:id')
  public async show(@Param() id: { id: string }, @Res() res: Response) {
    return restRouteAdapter(this.findOneByUserController)(
      { keys: ['id'], values: [id.id] },
      res,
    );
  }

  @Get('')
  public async index(@Query() pagination: IPagination, @Res() res: Response) {
    return restRouteAdapter(this.findAllUserController)({ pagination }, res);
  }
}
