import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { InterfaceModule } from './interface/interface.module';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [
    NgCommonModule,
    InterfaceModule,
    MaterialModule
  ],
  exports: [
    NgCommonModule,
    InterfaceModule,
    MaterialModule
  ],
  declarations: []
})
export class CommonModule { }
