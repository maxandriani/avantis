import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { InterfaceModule } from './interface/interface.module';
import { MaterialModule } from './material/material.module';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [
    CoreModule,
    NgCommonModule,
    InterfaceModule,
    MaterialModule
  ],
  exports: [
    CoreModule,
    NgCommonModule,
    InterfaceModule,
    MaterialModule
  ],
  declarations: []
})
export class CommonModule { }
