import { Injectable } from '@angular/core';
import { IBusinessValidatorStrategy } from 'src/app/common/core/validators/contracts/i-business-validator.strategy';
import { ItemEntity } from '../entities/item.entity';
import { ValidationErrors, AbstractControl, Validators, FormControl } from '@angular/forms';
import { BusinessError } from 'src/app/common/core/errors/business.error';

@Injectable({
  providedIn: 'root'
})
export class ItemFabricacaoValidatorStrategyService implements IBusinessValidatorStrategy<ItemEntity> {

  constructor() { }

  /**
   * Data no formato pt-Br e não pode ser superior a data de validade (caso seja um produto perecível)
   */
  protected validate(fabricacao: AbstractControl, perecivel: AbstractControl, validade: AbstractControl): ValidationErrors {
    const errors = [];

    try {
      const requiredFn = Validators.required;

      const fabRes = requiredFn(fabricacao);

      if (fabRes) {
        errors.push(fabRes);
      }

      if (perecivel.value === true) {
        const valRes = requiredFn(validade);

        if (valRes) {
          errors.push(valRes);
        } else if (!fabRes && !valRes) {
          const fabDate = new Date(fabricacao.value);
          const valDate = new Date(validade.value);
          if (fabDate.getTime() >= valDate.getTime()) {
            throw new BusinessError('A data de fabricação precisa ser inferior a data de validade');
          }
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
    return this.validate(new FormControl(model.fabricacao), new FormControl(model.isPerecivel), new FormControl(model.validade));
  }

  async validateControl(control: AbstractControl): Promise<ValidationErrors> {
    return (control.parent)
            ? this.validate(control, control.parent.get('isPerecivel'), control.parent.get('validade'))
            : null;
  }
}
