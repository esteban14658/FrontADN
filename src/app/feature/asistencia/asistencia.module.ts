import { NgModule } from '@angular/core';

import { AsistenciaRoutingModule } from './asistencia-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { CrearAsistenciaComponent } from './components/crear-asistencia/crear-asistencia.component';


@NgModule({
  declarations: [
    AsistenciaComponent,
    CrearAsistenciaComponent
  ],
  imports: [
    SharedModule,
    AsistenciaRoutingModule
  ]
})
export class AsistenciaModule { }
