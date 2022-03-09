import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearFacturaComponent } from './components/crear-factura/crear-factura.component';
import { FacturaComponent } from './components/factura/factura.component';
import { ListarFacturaComponent } from './components/listar-factura/listar-factura.component';

const routes: Routes = [
  {
    path: '',
    component: FacturaComponent,
    children: [
      {
        path: 'crear',
        component: CrearFacturaComponent
      },
      {
        path: 'listar',
        component: ListarFacturaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }
