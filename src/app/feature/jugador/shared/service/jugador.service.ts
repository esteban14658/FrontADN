import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Jugador } from '../../../../shared/model/jugador';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

const FECHA_INICIAL = 2010;
const FECHA_FINAL = 2030;
@Injectable()
export class JugadorService {

  private url  = `${environment.apiUrl}/jugadores`;
  listaJugador: Jugador[];

  constructor(protected http: HttpService,
              protected httpClient: HttpClient) { }

  public consultar(){
    return this.http.doGet<Jugador[]>(`${this.url}`, this.http.optsName('consultar jugadores'));
  }

  public equipoAleatorio(defensas: string, mediocampistas: string, delanteros: string){
    const envioDtoPosiciones = new HttpParams()
                .set('defensas', defensas)
                .set('mediocampistas', mediocampistas)
                .set('delanteros', delanteros);
    return this.http.doGetParameters<Jugador[]>(`${this.url}/equipo`, envioDtoPosiciones);
  }

  public obtenerPorDocumento(documento: number){
    return this.http.doGet<Jugador>(`${this.url}/jugador/${documento}`);
  }

  public listarPorCategoria(fecha: string){
    return this.http.doGet<Jugador[]>(`${this.url}/categoria/${fecha}`);
  }

  public guardar(jugador: Jugador) {
    return this.http.doPost<Jugador, boolean>(`${this.url}`, jugador,
                                                this.http.optsName('crear jugadores'));
  }

  public actualizar(jugador: Jugador, id: number){
    return this.httpClient.put<boolean>(`${this.url}/${id}`, jugador);
  }

  public eliminar(id: number) {
    return this.http.doDelete<boolean>(`${this.url}/${id}`,
                                                 this.http.optsName('eliminar jugadores'));
  }

  public listaDeAnios(){
    const array = new Array();
    let j = 0;
    for (let i = FECHA_INICIAL; i < FECHA_FINAL; i++){
      array[j] = i.toString();
      j++;
    }
    return array;
  }

}
