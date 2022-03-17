import { NgModule } from '@angular/core';

import { AsistenciaRoutingModule } from './asistencia-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { CrearAsistenciaComponent } from './components/crear-asistencia/crear-asistencia.component';
import { AsistenciaService } from './shared/service/asistencia.service';
import { MaterialModule } from '@core/_material/_material.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AsistenciaComponent,
    CrearAsistenciaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AsistenciaRoutingModule,
    MaterialModule
  ],
  providers: [AsistenciaService]
})
export class AsistenciaModule { }
