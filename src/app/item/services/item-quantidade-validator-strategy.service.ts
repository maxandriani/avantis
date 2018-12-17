import { Injectable } from '@angular/core';
import { IBusinessValidatorStrategy } from 'src/app/common/core/validators/contracts/i-business-validator.strategy';
import { ItemEntity } from '../entities/item.entity';
import { ValidationErrors, AbstractControl, FormControl } from '@angular/forms';
import { ItemUnidadeEnum } from '../enums/item-unidade.enum';
import { integerValidator } from 'src/app/common/core/validators/integer-validator.directive';
import { floatValidator } from 'src/app/common/core/validators/float-validator.directive';

@Injectable({
  providedIn: 'root'
})
export class ItemQuantidadeValidatorStrategyService implements IBusinessValidatorStrategy<ItemEntity> {

  constructor() { }

  /**
   * Regra da unidade de medida:
   * - Campos com unidade de medida em litro deve permitir somente números,
   *   com até 3 casas decimais e apresentar a abreviatura “lt” ao final do campo (addon);
   * - Campos com unidade de medida em Quilograma deve permitir somente números,
   *   com até 3 casas decimais e apresentar a abreviatura “kg” ao final do campo (addon);
   * - Campos com unidade de medida em Unidade deve permitir somente números inteiros e
   *   apresentar a abreviatura “un” ao final do campo (addon);
   */
  protected validate(control: AbstractControl, unidade: ItemUnidadeEnum): ValidationErrors {
    const errors = [];

    try {
      if (unidade === ItemUnidadeEnum.Unity) {
        // Validar inteiros
        const iValidator = integerValidator();
        const r = iValidator(control);
        if (r) {
          errors.push(r);
        }
      } else {
        // Validação de decimais
        const fValidator = floatValidator();
        const r = fValidator(control);
        if (r) {
          errors.push(r);
        }
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
    return this.validate(new FormControl(model.quantidade), model.unidade);
  }
  async validateControl(control: AbstractControl): Promise<ValidationErrors> {
    return (control.parent)
            ? this.validate(control, parseInt(control.parent.get('unidade').value, 10))
            : null;
  }

}
