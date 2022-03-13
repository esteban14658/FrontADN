import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Asistencia } from '../model/asistencia';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  private url : string = `${environment.apiUrl}/asistencias`;

  constructor(protected http: HttpService) { }

  public guardar(asistencia: Asistencia) {
    return this.http.doPost<Asistencia, boolean>(`${this.url}`, asistencia,
                                                this.http.optsName('crear/actualizar asistencias'));
  }

  
}
