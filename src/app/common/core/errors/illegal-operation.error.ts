export class IllegalOperationError extends Error {

  /** default message */
  static readonly IllegalOperation = 'Operação não permitida!';

  constructor(
    message: string = IllegalOperationError.IllegalOperation,
  ) {
    super(message);
  }

}
