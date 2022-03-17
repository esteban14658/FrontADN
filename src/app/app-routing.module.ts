import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';
import { HomeComponent } from '@home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [SecurityGuard]  },
  { path: 'jugador', loadChildren: () => import('./feature/jugador/jugador.module').then(mod => mod.JugadorModule) },
  { path: 'factura', loadChildren: () => import('./feature/factura/factura.module').then(mod => mod.FacturaModule)},
  { path: 'asistencia', loadChildren: () => import('./feature/asistencia/asistencia.module').then(mod => mod.AsistenciaModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
