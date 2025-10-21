export class DomainException extends Error {
  public readonly name: string = 'DomainException';
  public readonly code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
