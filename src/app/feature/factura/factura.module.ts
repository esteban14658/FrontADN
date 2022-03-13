import { NgModule } from '@angular/core';

import { FacturaRoutingModule } from './factura-routing.module';
import { ListarFacturaComponent } from './components/listar-factura/listar-factura.component';
import { CrearFacturaComponent } from './components/crear-factura/crear-factura.component';
import { FacturaComponent } from './components/factura/factura.component';
import { SharedModule } from '@shared/shared.module';
import { BorrarFacturaComponent } from './components/borrar-factura/borrar-factura.component';


@NgModule({
  declarations: [
    ListarFacturaComponent,
    CrearFacturaComponent,
    FacturaComponent,
    BorrarFacturaComponent
  ],
  imports: [
    SharedModule,
    FacturaRoutingModule
  ]
})
export class FacturaModule { }
