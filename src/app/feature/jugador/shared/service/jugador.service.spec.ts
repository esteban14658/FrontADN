import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { JugadorService } from './jugador.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { HttpResponse } from '@angular/common/http';
import { Jugador } from '../model/jugador';

describe('JugadorService', () => {
  let httpMock: HttpTestingController;
  let service: JugadorService;
  const apiEndpointJugadorConsulta = `${environment.endpoint}/jugadores`;
  const apiEndpointJugadores = `${environment.endpoint}/jugadores`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JugadorService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(JugadorService);
  });

  it('should be created', () => {
    const jugadorService: JugadorService = TestBed.inject(JugadorService);
    expect(jugadorService).toBeTruthy();
  });

  it('deberia listar jugadores', () => {
    const dummyJugadores = [
      new Jugador(1, 1010101, 'Esteban', 'Beltran', new Date(), 67.3, 1.80, 'Delantero', 'Derecho'), 
      new Jugador(2, 1010102, 'Juan', 'Beltran', new Date(), 45.3, 1.65, 'Portero', 'Derecho')
    ];
    service.consultar().subscribe(jugadores => {
      expect(jugadores.length).toBe(2);
      expect(jugadores).toEqual(dummyJugadores);
    });
    const req = httpMock.expectOne(apiEndpointJugadorConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyJugadores);
  });

  it('deberia obtener un jugador', () => {
    let jugador = new Jugador(1, 1010101, 'Esteban', 'Beltran', new Date(), 67.3, 1.80, 'Delantero', 'Derecho');
    service.obtenerPorDocumento(1010101).subscribe(jugadores => {
      expect(jugadores).toEqual(jugador);
    });
    const req = httpMock.expectOne(apiEndpointJugadorConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(jugador);
  });  

  it('deberia crear un jugador', () => {
    const dummyJugador = new Jugador(1, 1010101, 'Esteban', 'Beltran', new Date(), 67.3, 1.80, 'Delantero', 'Derecho');
    service.guardar(dummyJugador).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointJugadores);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia eliminar un jugador', () => {
    const dummyJugador = new Jugador(1, 1010101, 'Esteban', 'Beltran', new Date(), 67.3, 1.80, 'Delantero', 'Derecho');
    service.eliminar(dummyJugador).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointJugadores}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});
