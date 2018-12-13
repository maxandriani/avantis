import { ItemModule } from './item.module';

describe('ItemsModule', () => {
  let itemsModule: ItemModule;

  beforeEach(() => {
    itemsModule = new ItemModule();
  });

  it('should create an instance', () => {
    expect(itemsModule).toBeTruthy();
  });
});
