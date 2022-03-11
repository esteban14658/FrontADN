import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Jugador } from '../model/jugador';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  private url : string = `${environment.endpoint}/jugadores`;

  constructor(protected http: HttpService) { }

  public consultar(){
    return this.http.doGet<Jugador[]>(`${this.url}`, this.http.optsName('consultar jugadores'));
  }

  public listarJugadoresSinFactura(){
    return this.http.doGet<Jugador[]>(`${this.url}/factura`, this.http.optsName('consultar jugadores sin factura'));
  }

  public listarJugadoresSinAsistencia(){
    return this.http.doGet<Jugador[]>(`${this.url}/asistencia`, this.http.optsName('consultar jugadores sin asistencia'));
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

  public listarPorPosicion(posicion: string){
    return this.http.doGet<Jugador[]>(`${this.url}/${posicion}`)
  }

  public listarPorPieHabil(pieHabil: string){
    return this.http.doGet<Jugador[]>(`${this.url}/jugadores/${pieHabil}`);
  }

  public guardar(jugador: Jugador) {
    return this.http.doPost<Jugador, boolean>(`${this.url}`, jugador,
                                                this.http.optsName('crear/actualizar jugadores'));
  }

  public eliminar(id: number) {
    return this.http.doDelete<boolean>(`${this.url}/${id}`,
                                                 this.http.optsName('eliminar jugadores'));
  }

}
