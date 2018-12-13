export class BusinessError extends Error {
  readonly help: string;

  constructor(
    message: string,
    help?: string
  ) {
    super(message);

    this.help = help;
  }
}
