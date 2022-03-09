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
}
