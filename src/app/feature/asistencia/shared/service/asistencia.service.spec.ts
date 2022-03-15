import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { Jugador } from 'src/app/feature/jugador/shared/model/jugador';
import { environment } from 'src/environments/environment';
import { Asistencia } from '../model/asistencia';
import { AsistenciaService } from './asistencia.service';


describe('AsistenciaService', () => {
    let httpMock: HttpTestingController;
    let service: AsistenciaService;
    const apiEndpointAsistencias = `${environment.apiUrl}/asistencias`;

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

    it('deberia crear una asistencia', () => {
      const jugador = new Jugador(1, 1010101, 'Esteban', 'Beltran', '2010-08-11', 67.3, 1.80, 'Delantero', 'Derecho');
      const dummyAsistencia = new Asistencia(1, '2022-03-11', jugador);
      service.guardar(dummyAsistencia).subscribe((respuesta) => {
        expect(respuesta).toEqual(true);
      });
      const req = httpMock.expectOne(apiEndpointAsistencias);
      expect(req.request.method).toBe('POST');
      req.event(new HttpResponse<boolean>({body: true}));
    });

  });
