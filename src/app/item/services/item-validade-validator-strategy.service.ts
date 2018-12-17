import { Injectable } from '@angular/core';
import { IBusinessValidatorStrategy } from 'src/app/common/core/validators/contracts/i-business-validator.strategy';
import { ItemEntity } from '../entities/item.entity';
import { AbstractControl, ValidationErrors, FormControl, Validators } from '@angular/forms';
import { BusinessError } from 'src/app/common/core/errors/business.error';

@Injectable({
  providedIn: 'root'
})
export class ItemValidadeValidatorStrategyService implements IBusinessValidatorStrategy<ItemEntity> {

  constructor() { }

  /**
   * Data no formato pt-Br. Caso a data de validade seja inferior a data atual deve informar que o produto encontra-se vencido.
   */
  protected validate(validade: AbstractControl, perecivel: AbstractControl, fabricacao: AbstractControl): ValidationErrors {
    const errors = [];

    try {
      if (perecivel.value === true) {
        const valRes = Validators.required(validade);
        if (valRes) {
          errors.push(valRes);
        }

        const fabRes = Validators.required(fabricacao);
        if (!fabRes && !valRes) {
          const fabDate = new Date(fabricacao.value);
          const valDate = new Date(validade.value);
          if (fabDate.getTime() >= valDate.getTime()) {
            throw new BusinessError('A data de validade precisa ser superior a data de fabricação');
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
    return this.validate(new FormControl(model.validade), new FormControl(model.isPerecivel), new FormControl(model.fabricacao));
  }

  async validateControl(control: AbstractControl): Promise<ValidationErrors> {
    return (control.parent)
            ? this.validate(control, control.parent.get('isPerecivel'), control.parent.get('fabricacao'))
            : null;
  }

}
