export class ErrorList extends Error implements IterableIterator<Error> {

  private _errors: Error[];
  private _index: number;

  constructor() {
    super();
    this._errors = [];
  }

  /**
   * Attach a new error to collection
   */
  push(e: Error) {
    this._errors.push(e);
  }

  /**
    * Concat
    */
  concat(ers: Error[]) {
    this._errors = this._errors.concat(ers);
  }

  /**
   * Get a copy of Error's collection
   */
  getErrors(): Error[] {
    return [].concat(this._errors);
  }

  [Symbol.iterator](): IterableIterator<Error> {
    return this;
  }

  /**
   * Iterate the Error Collection piece by piece
   */
  next(value?: any): IteratorResult<Error> {

    const r: IteratorResult<Error> = {
      value,
      done: true
    };

    if (this._errors.length > 0) {
      if (this._index === this._errors.length) {
        this._index = 0;
      } else {
        if (!this._index) {
          this._index = 0;
        }

        r.value = this._errors[this._index];
        r.done = false;
      }
    }

    return r;
  }

  /**
   * Return the value informed on parameter and stop iterate
   */
  return?(value?: any): IteratorResult<Error> {
    this._index = this._errors.length;
    return {
      value: value,
      done: true
    };
  }

  /**
   * Thorw an Error and stop iterate
   */
  throw?(e?: any): IteratorResult<Error> {
    this._index = this._errors.length;
    if (e) { throw e; }
    throw new Error('Iterable Exception');
  }

}
