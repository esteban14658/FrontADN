import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearJugadorComponent } from './components/crear-jugador/crear-jugador.component';
import { JugadorComponent } from './components/jugador/jugador.component';
import { ListarJugadorComponent } from './components/listar-jugador/listar-jugador.component';

const routes: Routes = [
  {
    path: '',
    component: JugadorComponent,
    children: [
      {
        path: 'crear',
        component: CrearJugadorComponent
      },
      {
        path: 'listar',
        component: ListarJugadorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JugadorRoutingModule { }
