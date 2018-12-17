import { Injectable } from '@angular/core';
import { IBusinessValidatorStrategy } from 'src/app/common/core/validators/contracts/i-business-validator.strategy';
import { ItemEntity } from '../entities/item.entity';
import { ValidationErrors, AbstractControl, Validators, FormControl } from '@angular/forms';
import { currencyValidator } from 'src/app/common/core/validators/currency-validator.directive';

@Injectable({
  providedIn: 'root'
})
export class ItemPrecoValidatorStrategyService implements IBusinessValidatorStrategy<ItemEntity> {

  constructor() { }

  /**
   * Validação de campo monetário incluí exibição do tipo de moeda no início do campo
   * e limite de casas decimais utilizando máscara (preenchimento da direita para esquerda).
   */
  protected validate(control: AbstractControl): ValidationErrors {
    const errors = [];

    try {
      const requiredFn = Validators.required;
      const currencyFn = currencyValidator();

      const reqRes = requiredFn(control);
      const curRes = currencyFn(control);

      if (reqRes) {
        errors.push(reqRes);
      }

      if (curRes) {
        errors.push(curRes);
      }
    } catch (e) {
      errors.push({
        business: {
          error: e
        }
      });
    }

    if (errors.length > 0) {
      return Object.assign({}, ...errors);
    } else {
      return null;
    }
  }

  async validateBusiness(model: ItemEntity): Promise<ValidationErrors> {
    return this.validate(new FormControl(model.preco));
  }
  async validateControl(control: AbstractControl): Promise<ValidationErrors> {
    return this.validate(control);
  }
}
