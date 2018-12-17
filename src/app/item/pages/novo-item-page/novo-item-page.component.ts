import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Subscription } from 'rxjs';
import { ItemEntity } from '../../entities/item.entity';
import { ItemFormComponent } from '../../components/item-form/item-form.component';

@Component({
  selector: 'av-novo-item-page',
  templateUrl: './novo-item-page.component.html',
  styleUrls: ['./novo-item-page.component.scss']
})
export class NovoItemPageComponent implements OnInit, OnDestroy {

  constructor(
    protected $route: ActivatedRoute,
    protected $router: Router,
    protected $items: ItemService
  ) { }

  protected subscriptions: Subscription[] = [];

  item: ItemEntity = new ItemEntity;

  @ViewChild(ItemFormComponent) form: ItemFormComponent;

  ngOnInit() {
    this.subscriptions
        .push(
          this.$route
              .params
              .subscribe(params => this.getItemFromParams(params)),
          this.$items
              .asObservable()
              .subscribe(() => this.$router.navigate([`/${this.item.id}`]))
        );
  }

  ngOnDestroy() {
    this.subscriptions
        .map(s => s.unsubscribe());
  }

  protected async getItemFromParams(params: Params) {
    if (params['itemId']) {
      this.item = await this.$items
                            .get(parseInt(params['itemId'], 10));
    }
  }

  onSave() {
    this.form.onSubmit();
  }

  onCancel() {
    this.$router.navigate(['/']);
  }

  isValid(): boolean {
    return !(this.form.form.valid && this.form.form.touched);
  }

}
