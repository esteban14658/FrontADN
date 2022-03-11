import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Factura } from '../model/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private url : string = `${environment.endpoint}/facturas`;

  constructor(protected http: HttpService) { }

  public consultar(){
    return this.http.doGet<Factura[]>(`${this.url}`, this.http.optsName('consultar facturas'));
  }

  public guardar(factura: Factura) {
    return this.http.doPost<Factura, boolean>(`${this.url}`, factura,
                                                this.http.optsName('crear/actualizar facturas'));
  }

  public eliminar(id: number) {
    return this.http.doDelete<boolean>(`${this.url}/${id}`,
                                                 this.http.optsName('eliminar facturas'));
  }
}
