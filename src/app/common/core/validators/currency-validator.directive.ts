import { ValidatorFn, AbstractControl, ValidationErrors, NG_VALIDATORS, Validator } from '@angular/forms';
import { IllegalOperationError } from '../errors/illegal-operation.error';
import { Directive, forwardRef } from '@angular/core';
import { INVALID_DECIMAL_ERROR, ONLY_DIGITS_ALLOWED } from '../errors/error.collection';

/**
 * Currency Validator Factory
 */
export function currencyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    try {
      const strValue: string = control.value.toString().replace(/(\.)/g, ',');
      const parts = strValue.split(',');
      if (parts.length > 1 && parts[(parts.length - 1)].length > 2) {
        throw new IllegalOperationError(INVALID_DECIMAL_ERROR.replace('?', '2'));
      }
      const digitsTest = strValue.replace(/[^\d\,\.]/g, '');
      if (digitsTest !== strValue) {
        throw new IllegalOperationError(ONLY_DIGITS_ALLOWED);
      }
    } catch (e) {
      return {
        currency: {
          error: e
        }
      };
    }
    return null;
  };
}

@Directive({
  selector: `[avCurrencyValidator][formControlName],
             [avCurrencyValidator][formControl],
             [avCurrencyValidator][ngModel]`,
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => CurrencyValidatorDirective), multi: true }
  ]
})
export class CurrencyValidatorDirective implements Validator {

  constructor(
  ) {
    this.buildValidator();
  }

  protected validatorFn: ValidatorFn;
  protected lastResult: boolean;

  protected onChange = () => {};

  protected buildValidator() {
    this.validatorFn = currencyValidator();
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
