abstract class AbstractEntity<I> {
  private props: I;

  constructor(props: I) {
    this.props = props;
  }

  public exportValues(): I {
    return { ...this.props };
  }
}

export { AbstractEntity };
