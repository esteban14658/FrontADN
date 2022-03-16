import { NgModule } from '@angular/core';

import { AsistenciaRoutingModule } from './asistencia-routing.module';
import { SharedModule } from '@shared/shared.module';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { CrearAsistenciaComponent } from './components/crear-asistencia/crear-asistencia.component';
import { ListarAsistenciaComponent } from './components/listar-asistencia/listar-asistencia.component';


@NgModule({
  declarations: [
    AsistenciaComponent,
    CrearAsistenciaComponent,
    ListarAsistenciaComponent
  ],
  imports: [
    SharedModule,
    AsistenciaRoutingModule
  ]
})
export class AsistenciaModule { }
