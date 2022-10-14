interface IErrorBody {
  code: string;
  message: string;
  shortMessage: string;
}

class IError {
  public code: number;
  public body: IErrorBody;

  constructor({ code, body }: { code: number; body: IErrorBody }) {
    this.code = code;
    this.body = body;
  }
}

export { IError, IErrorBody };
