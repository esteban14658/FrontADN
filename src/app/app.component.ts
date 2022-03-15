import { Component } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-base';
  public companies: MenuItem[] = [
    { url: '/home', nombre: 'home' },
    { url: '/jugador', nombre: 'jugador' },
    { url: '/factura', nombre: 'factura' },
    { url: '/asistencia/crear', nombre: 'asistencia'}
  ];

}
