import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura-routing.module';
import { ListarFacturaComponent } from './components/listar-factura/listar-factura.component';
import { CrearFacturaComponent } from './components/crear-factura/crear-factura.component';
import { FacturaComponent } from './components/factura/factura.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ListarFacturaComponent,
    CrearFacturaComponent,
    FacturaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FacturaRoutingModule
  ]
})
export class FacturaModule { }
