import { CreateUserSerializer } from '@/3-presentation/serializers';
import {
  CreateUserController,
  FindOneByUserController,
} from '@/3-presentation/controllers';
import { restRouteAdapter } from '@/4-framework/adapters';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { FindAllUserController } from '@/3-presentation/controllers/user/find-all-users.controller';
import { IPagination } from '@/2-business/repositories';
import { IUserEntity } from '@/1-domain/entities';
import { UpdateUserController } from '@/3-presentation/controllers/user/update-user.controller';
import { DeleteUserController } from '@/3-presentation/controllers/user/delete-user.controller';

@Controller('users')
export class UserRoutes {
  constructor(
    private readonly createUserController: CreateUserController,
    private readonly findOneByUserController: FindOneByUserController,
    private readonly findAllUserController: FindAllUserController,
    private readonly updateUserController: UpdateUserController,
    private readonly deleteUserController: DeleteUserController,
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
  public async index(
    @Query() pagination: IPagination,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    return restRouteAdapter(this.findAllUserController)(
      { pagination },
      res,
      {
        login: false,
        protect: true,
        status: 200,
      },
      req,
    );
  }

  @Put('/:id')
  public async update(
    @Param() id: { id: string },
    @Body() body: Partial<IUserEntity>,
    @Res() res: Response,
  ) {
    return restRouteAdapter(this.updateUserController)(
      { id: id.id, newData: body },
      res,
    );
  }
  @Delete('/:id')
  public async delete(@Param() id: { id: string }, @Res() res: Response) {
    return restRouteAdapter(this.deleteUserController)({ id: id.id }, res);
  }
}
