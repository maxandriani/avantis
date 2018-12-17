import { Provider, APP_INITIALIZER } from '@angular/core';
import { MenuService } from './common/interface/services/menu.service';
import { ItemSeederService } from './item/services/item-seeder.service';

export const AV_APP_INITIALIZER_PROVIDER: Provider = {
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: AvAppInitializer,
  deps: [MenuService, ItemSeederService]
};

export function AvAppInitializer(
  $menu: MenuService,
  $items: ItemSeederService
) {
  return async () => {
    $menu
      .push([
        {
          label: 'Itens',
          route: 'items'
        },
        {
          label: 'Novo Item',
          route: 'items/novo'
        }
      ]);

    $items.seed();
  };
}
