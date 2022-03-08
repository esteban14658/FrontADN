import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Jugador } from '../model/jugador';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class JugadorService {

  private url : string = `${environment.endpoint}/jugadores`;

  constructor(protected http: HttpService, protected httpClient: HttpClient) { }

  public consultar(){
    return this.http.doGet<Jugador[]>(`${this.url}`, this.http.optsName('consultar jugadores'));
  }

  public equipoAleatorio(){
    const envioDtoPosiciones = new HttpParams()
                .set('defensas', '4')
                .set('mediocampistas', '4')
                .set('delanteros', '2');
    return this.http.doGetParameters<Jugador[]>(`${this.url}/equipo`, envioDtoPosiciones);
  }

  public obtenerPorDocumento(documento: number){
    return this.http.doGet<Jugador>(`${this.url}/jugador/${documento}`);
  }

  public listarPorPosicion(posicion: string){
    return this.http.doGet<Jugador[]>(`${this.url}/${posicion}`)
  }

  public listarPorPieHabil(pieHabil: string){
    return this.http.doGet<Jugador[]>(`${this.url}/jugadores/${pieHabil}`);
  }

  public guardar(jugador: Jugador) {
    return this.http.doPost<Jugador, boolean>(`${this.url}`, jugador,
                                                this.http.optsName('crear/actualizar productos'));
  }

  public eliminar(id: number) {
    return this.http.doDelete<boolean>(`${this.url}/${id}`,
                                                 this.http.optsName('eliminar productos'));
  }

}
