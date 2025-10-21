export abstract class BaseEntity<T> {
  protected readonly _id: string;
  protected props: T;

  constructor(props: T, id: string) {
    this._id = id;
    this.props = props;
  }

  get id(): string {
    return this._id;
  }

  equals(object?: BaseEntity<T>): boolean {
    if (object === null || object === undefined) return false;
    if (object === this) return true;
    return this._id === object._id;
  }
}
