import { AbstractController } from '@/3-presentation/controllers';
import { Either } from '@/shared/either';
import { IError } from '@/shared/error';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

type Params = {
  status: number;
  login: boolean;
  protect: boolean;
};

export const restRouteAdapter =
  <I>(controller: AbstractController<I, Either<IError, any>>) =>
  async (
    body: I,
    res: Response,
    params: Params = { status: 200, login: false, protect: false },
    req?: Request,
  ) => {
    let opResult;
    if (!params.protect) opResult = await controller.run(body);
    else {
      if (!req.headers.authorization) {
        return res.status(401).json({
          message: 'JWT token is Missing',
        });
      }
      const [, token] = req.headers.authorization.split(' ');
      try {
        verify(token, process.env.SECRET_TOKEN as string);
        opResult = await controller.run(body, token);
      } catch (error) {
        return res.status(401).json({
          message: 'invalid JWT token',
        });
      }
    }

    if (opResult?.isRight()) {
      return res.status(params.status).send(opResult.value);
    } else if (opResult?.isLeft()) {
      return res.status(opResult.value?.code || 500).send(opResult.value?.body);
    }
    return res.status(500).json({
      message: 'Internal server error',
    });
  };
