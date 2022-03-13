import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Jugador } from 'src/app/feature/jugador/shared/model/jugador';
import { environment } from 'src/environments/environment';
import { Factura } from '../model/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private url : string = `${environment.apiUrl}/facturas`;

  constructor(protected http: HttpService) { }

  public consultar(){
    return this.http.doGet<Factura[]>(`${this.url}`, this.http.optsName('consultar facturas'));
  }

  public guardar(factura: Factura) {
    return this.http.doPost<Factura, boolean>(`${this.url}`, factura,
                                                this.http.optsName('crear/actualizar facturas'));
  }

  public listarJugadoresSinFactura(){
    return this.http.doGet<Jugador[]>(`${this.url}/factura`, this.http.optsName('consultar jugadores sin factura'));
  }

  public eliminar(id: number) {
    return this.http.doDelete<boolean>(`${this.url}/${id}`,
                                                 this.http.optsName('eliminar facturas'));
  }
}
