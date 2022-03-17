import { NgModule } from '@angular/core';

import { JugadorRoutingModule } from './jugador-routing.module';
import { BorrarJugadorComponent } from './components/borrar-jugador/borrar-jugador.component';
import { CrearJugadorComponent } from './components/crear-jugador/crear-jugador.component';
import { JugadorComponent } from './components/jugador/jugador.component';
import { ListarJugadorComponent } from './components/listar-jugador/listar-jugador.component';
import { SharedModule } from '@shared/shared.module';
import { JugadorService } from './shared/service/jugador.service';
import { MaterialModule } from '@core/_material/_material.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    BorrarJugadorComponent,
    CrearJugadorComponent,
    JugadorComponent,
    ListarJugadorComponent
  ],
  imports: [
    CommonModule,
    JugadorRoutingModule,
    SharedModule,
    MaterialModule
  ],
  providers: [JugadorService]
})
export class JugadorModule { }
