import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessValidatorDirective } from './validators/business-validator.directive';
import { CurrencyValidatorDirective } from './validators/currency-validator.directive';
import { FloatValidatorDirective } from './validators/float-validator.directive';
import { IntegerValidatorDirective } from './validators/integer-validator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BusinessValidatorDirective,
    CurrencyValidatorDirective,
    FloatValidatorDirective,
    IntegerValidatorDirective
  ],
  exports: [
    BusinessValidatorDirective,
    CurrencyValidatorDirective,
    FloatValidatorDirective,
    IntegerValidatorDirective
  ]
})
export class CoreModule { }
