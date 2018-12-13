import { InterfaceModule } from './interface.module';

describe('InterfaceModule', () => {
  let interfaceModule: InterfaceModule;

  beforeEach(() => {
    interfaceModule = new InterfaceModule();
  });

  it('should create an instance', () => {
    expect(interfaceModule).toBeTruthy();
  });
});
