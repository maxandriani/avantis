import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ItemEntity } from '../../entities/item.entity';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DisplayItemPerecivelService } from '../../services/display-item-perecivel.service';
import { DisplayItemUnidadeService } from '../../services/display-item-unidade.service';
import { IDisplayItemUnidade } from '../../interfaces/i-display-item-unidade.interface';
import { IDisplayItemPerecivel } from '../../interfaces/i-display-item-perecvel.interface';
import { ItemUnidadeEnum } from '../../enums/item-unidade.enum';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogErrorComponent } from 'src/app/common/interface/dialog-error/dialog-error.component';
import { IErrorDialogData } from 'src/app/common/interface/interfaces/i-error-dialog-data';
import { BusinessError } from 'src/app/common/core/errors/business.error';
import { plainToClass } from 'class-transformer';
import { ItemService } from '../../services/item.service';
import { Subscription } from 'rxjs';
import { businessValidator } from 'src/app/common/core/validators/business-validator.directive';
import { ItemPrecoValidatorStrategyService } from '../../services/item-preco-validator-strategy.service';
import { ItemQuantidadeValidatorStrategyService } from '../../services/item-quantidade-validator-strategy.service';
import { ItemFabricacaoValidatorStrategyService } from '../../services/item-fabricacao-validator-strategy.service';
import { ItemValidadeValidatorStrategyService } from '../../services/item-validade-validator-strategy.service';
import { ErrorParserService } from 'src/app/common/core/services/error-parser.service';

@Component({
  selector: 'av-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit, OnChanges, OnDestroy {

  constructor(
    protected $fb: FormBuilder,
    protected $items: ItemService,
    protected $itemUnidade: DisplayItemUnidadeService,
    protected $itemPerecivel: DisplayItemPerecivelService,
    protected $snackbar: MatSnackBar,
    protected $dialog: MatDialog,
    protected $itemPrecoStrategy: ItemPrecoValidatorStrategyService,
    protected $itemQuantidadeStrategy: ItemQuantidadeValidatorStrategyService,
    protected $itemFabricacaoStrategy: ItemFabricacaoValidatorStrategyService,
    protected $itemValidadeStrategy: ItemValidadeValidatorStrategyService,
    protected $parser: ErrorParserService
  ) { }

  @Input() entity: ItemEntity = new ItemEntity;

  protected subscriptions: Subscription[] = [];

  itemUnidades: IDisplayItemUnidade[] = [];
  itemPereciveis: IDisplayItemPerecivel[] = [];
  integerValue: boolean;
  perecivel: boolean;
  unitType: Promise<string>;
  form = this.$fb
          .group({
            nome: [null, Validators.required],
            unidade: [ItemUnidadeEnum.Unity, Validators.required],
            quantidade: [null, undefined, businessValidator<ItemEntity>(this.$itemQuantidadeStrategy)],
            preco: [null, Validators.required, undefined, businessValidator<ItemEntity>(this.$itemPrecoStrategy)],
            isPerecivel: [null, Validators.required],
            validade: [null, undefined, businessValidator<ItemEntity>(this.$itemValidadeStrategy)],
            fabricacao: [null, Validators.required, businessValidator<ItemEntity>(this.$itemFabricacaoStrategy)]
          });

  ngOnInit() {
    this.$itemUnidade
        .getAll()
        .subscribe(r => this.itemUnidades = r);
    this.$itemPerecivel
        .getAll()
        .subscribe(r => this.itemPereciveis = r);

    this.subscriptions
        .push(
          this.form
              .get('unidade')
              .valueChanges
              .subscribe(value => {
                const v = parseInt(value, 10);
                this.integerValue = (v === ItemUnidadeEnum.Unity);
                this.unitType = this.$itemUnidade.getAbbr(v);
              }),
          this.form
              .get('isPerecivel')
              .valueChanges
              .subscribe(value => this.perecivel = value)
        );
  }

  ngOnDestroy() {
    this.subscriptions
        .map(s => s.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.entity) {
      if (this.entity) {
        this.form.patchValue(this.entity);
      } else {
        this.entity = new ItemEntity;
      }
    }
  }

  getUnitType() {
    const unit = parseInt(this.form.get('unidade').value || ItemUnidadeEnum.Unity, 10);
    return this.$itemUnidade.getAbbr(unit);
  }

  getError(control: AbstractControl) {
    return (control)
            ? this.$parser.parse(control)
            : '';
  }

  async onSubmit(): Promise<void> {
    const snackRef = this.$snackbar.open('Salvando dados...');
    try {
      this.form.disable();

      const formData = this.form.getRawValue();
      /** Normalizando dados */
      formData.quantidade = parseFloat(formData.quantidade
                                               .toString()
                                               .replace(',', '.'));
      formData.preco = parseFloat(formData.preco
                                          .toString()
                                          .replace(',', '.'));
      /** Sobrescrevendo entidade */
      Object.assign(this.entity, plainToClass(ItemEntity, formData));
      await this.$items.save(this.entity);
      this.$snackbar.open('Item salvo com sucesso!', undefined, {
        duration: 2000
      });
    } catch (err) {
      const dialogData: IErrorDialogData = {
        title: 'Erro ao salvar dados',
        message: err.message,
        error: err
      };

      if (err instanceof BusinessError) {
        dialogData.title = 'Regra de negócio violada!';
        dialogData.error = undefined;
      }

      /** @todo criar UI */
      this.$dialog.open(DialogErrorComponent, { data: dialogData });
    } finally {
      snackRef.dismiss();
      this.form.enable();
    }
  }

}
