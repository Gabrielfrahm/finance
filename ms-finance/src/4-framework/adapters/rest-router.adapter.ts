import { AbstractController } from '@/3-presentation/controllers';
import { Either } from '@/shared/either';
import { IError } from '@/shared/error';
import accessTokenCookieOptions from '@/shared/utils/cookies.util';
import { Request, Response } from 'express';

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
      opResult = await controller.run(body, req!.cookies['accessToken']);
    }

    if (opResult?.isRight()) {
      if (!params.login) {
        return res.status(params.status).send(opResult.value);
      } else {
        res.cookie(
          'accessToken',
          opResult.value.token,
          accessTokenCookieOptions,
        );
        return res.redirect(process.env.ORIGIN as string);
      }
    } else if (opResult?.isLeft()) {
      return res.status(opResult.value?.code || 500).send(opResult.value?.body);
    }
    return res.status(500).json({
      message: 'Internal server error',
    });
  };
