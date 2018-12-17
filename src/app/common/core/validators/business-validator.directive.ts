import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS,
  Validator,
  ValidatorFn
} from '@angular/forms';
import { IBusinessValidatorStrategy } from './contracts/i-business-validator.strategy';
import { Directive, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';

/**
 * Business Validator Factory
 */
export function businessValidator<T>(strategy: IBusinessValidatorStrategy<T>): AsyncValidatorFn {
  return async (control: AbstractControl): Promise<ValidationErrors> => {
    try {
      return await strategy.validateControl(control);
    } catch (e) {
      return {
        business: {
          error: e
        }
      };
    }
  };
}

@Directive({
  selector: `[avBusinessValidator][formControlName],
             [avBusinessValidator][formControl],
             [avBusinessValidator][ngModel]`,
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => BusinessValidatorDirective), multi: true }
  ]
})
export class BusinessValidatorDirective<T> implements Validator, OnChanges {

  constructor(
    // @Optional() @Host() @SkipSelf()
    // protected $controlContainer: ControlContainer,
  ) {
  }

  protected validatorFn: ValidatorFn;
  protected lastResult: boolean;

  @Input() strategy: IBusinessValidatorStrategy<T>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.strategy && this.strategy) {
      this.buildValidator();
    }
  }

  protected onChange = () => {};

  protected buildValidator() {
    this.validatorFn = businessValidator(this.strategy);
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
