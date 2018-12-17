import { AbstractControl, ValidationErrors, ValidatorFn, NG_VALIDATORS, Validator } from '@angular/forms';
import { IllegalOperationError } from '../errors/illegal-operation.error';
import { INVALID_DECIMAL_ERROR, ONLY_DIGITS_ALLOWED } from '../errors/error.collection';
import { Directive, forwardRef } from '@angular/core';

/**
 * Float Validator Factory
 */
export function floatValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    try {
      const strValue: string = control.value.toString().replace(/(\.)/g, ',');
      const parts = strValue.split(',');
      if (parts.length > 1 && parts[(parts.length - 1)].length > 3) {
        throw new IllegalOperationError(INVALID_DECIMAL_ERROR.replace('?', '3'));
      }
      const digitsTest = strValue.replace(/[^\d\,\.]/g, '');
      if (digitsTest !== strValue) {
        throw new IllegalOperationError(ONLY_DIGITS_ALLOWED);
      }
    } catch (e) {
      return {
          float: {
            error: e
          }
        };
    }
  };
}

@Directive({
  selector: `[avFloatValidator][formControlName],
             [avFloatValidator][formControl],
             [avFloatValidator][ngModel]`,
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => FloatValidatorDirective), multi: true }
  ]
})
export class FloatValidatorDirective implements Validator {

  constructor(
  ) {
  }

  protected validatorFn: ValidatorFn;
  protected lastResult: boolean;

  protected onChange = () => {};

  protected buildValidator() {
    this.validatorFn = floatValidator();
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
