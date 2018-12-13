import { FormControl } from '@angular/forms';

export class ValidationError extends Error {
  readonly message: string;
  readonly control: FormControl;
  readonly error: string;
  readonly value: any;

  constructor(message: string, control: FormControl, error?: string, value?: any) {
    super(message);

    this.control = control;
    this.error = error;
    this.value = value;
  }
}
