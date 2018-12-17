import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export interface IBusinessValidatorStrategy<T> {
  validateBusiness(model: T): Promise<ValidationErrors>;
  validateControl(control: AbstractControl): Promise<ValidationErrors>;
}
