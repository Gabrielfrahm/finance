class Left<L, R> {
  public readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  public isLeft(): this is Left<L, R> {
    return true;
  }

  public isRight(): this is Right<L, R> {
    return false;
  }
}

class Right<L, R> {
  public readonly value: R;

  constructor(value: R) {
    this.value = value;
  }

  public isLeft(): this is Left<L, R> {
    return false;
  }

  public isRight(): this is Right<L, R> {
    return true;
  }
}

const left = <L, R>(value: L): Left<L, R> => new Left<L, R>(value);
const right = <L, R>(value: R): Right<L, R> => new Right<L, R>(value);

type Either<L, R> = Left<L, R> | Right<L, R>;

export { left, right, Either };
