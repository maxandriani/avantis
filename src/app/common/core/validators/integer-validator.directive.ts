import { ValidatorFn, AbstractControl, ValidationErrors, NG_VALIDATORS, Validator } from '@angular/forms';
import { IllegalOperationError } from '../errors/illegal-operation.error';
import { ONLY_DIGITS_ALLOWED } from '../errors/error.collection';
import { Directive, forwardRef } from '@angular/core';

/**
 * Integer Validator Factory
 */
export function integerValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    try {
      if (/[^\d]/g.test(control.value)) {
        throw new IllegalOperationError(ONLY_DIGITS_ALLOWED);
      }
    } catch (e) {
      return {
        integer: {
          error: e
        }
      };
    }
    return null;
  };
}

@Directive({
  selector: `[avIntegerValidator][formControlName],
             [avIntegerValidator][formControl],
             [avIntegerValidator][ngModel]`,
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => IntegerValidatorDirective), multi: true }
  ]
})
export class IntegerValidatorDirective implements Validator {

  constructor(
  ) {
  }

  protected validatorFn: ValidatorFn;
  protected lastResult: boolean;

  protected onChange = () => {};

  protected buildValidator() {
    this.validatorFn = integerValidator();
    if (this.lastResult) {
      this.onChange();
    } else {
      this.lastResult = true;
    }
  }

  validate(control: AbstractControl): ValidationErrors {
    return this.validatorFn(control);
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onChange = fn;
  }

}
