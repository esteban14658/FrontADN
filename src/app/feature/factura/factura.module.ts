import { NgModule } from '@angular/core';

import { FacturaRoutingModule } from './factura-routing.module';
import { ListarFacturaComponent } from './components/listar-factura/listar-factura.component';
import { CrearFacturaComponent } from './components/crear-factura/crear-factura.component';
import { FacturaComponent } from './components/factura/factura.component';
import { SharedModule } from '@shared/shared.module';
import { BorrarFacturaComponent } from './components/borrar-factura/borrar-factura.component';
import { MaterialModule } from '@core/_material/_material.module';
import { FacturaService } from './shared/service/factura.service';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    ListarFacturaComponent,
    CrearFacturaComponent,
    FacturaComponent,
    BorrarFacturaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FacturaRoutingModule,
    MaterialModule
  ],
  providers: [FacturaService]
})
export class FacturaModule { }
