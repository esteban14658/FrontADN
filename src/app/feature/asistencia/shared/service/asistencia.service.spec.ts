import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { Jugador } from '@shared/model/jugador';
import { environment } from 'src/environments/environment';
import { Asistencia } from '../model/asistencia';
import { AsistenciaService } from './asistencia.service';


describe('AsistenciaService', () => {
    let httpMock: HttpTestingController;
    let service: AsistenciaService;
    const apiEndpointAsistencias = `${environment.apiUrl}/asistencias`;
    const apiEndpointJugadores = `${environment.apiUrl}/jugadores`;

    beforeEach(() => {
      const injector = TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [AsistenciaService, HttpService]
      });
      httpMock = injector.inject(HttpTestingController);
      service = TestBed.inject(AsistenciaService);
    });

    it('should be created', () => {
      const asistenciaService: AsistenciaService = TestBed.inject(AsistenciaService);
      expect(asistenciaService).toBeTruthy();
    });

    it('deberia listar jugadores sin asistencias', () => {
      const dummyJugadores = [
        new Jugador(2),
        new Jugador(3),
        new Jugador(4)
      ];
      service.listarJugadoresSinAsistencia().subscribe(respuesta => {
        expect(respuesta.length).toBe(3);
        expect(respuesta).toEqual(dummyJugadores);
      });
      const req = httpMock.expectOne(`${apiEndpointJugadores}/asistencia`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyJugadores);
  });

    it('deberia crear una asistencia', () => {
      const jugador = new Jugador(1);
      const dummyAsistencia = new Asistencia(1, '2022-03-11', jugador);
      service.guardar(dummyAsistencia).subscribe((respuesta) => {
        expect(respuesta).toEqual(true);
      });
      const req = httpMock.expectOne(apiEndpointAsistencias);
      expect(req.request.method).toBe('POST');
      req.event(new HttpResponse<boolean>({body: true}));
    });

  });
