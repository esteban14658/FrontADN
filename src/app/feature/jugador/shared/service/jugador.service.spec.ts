import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { JugadorService } from './jugador.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { HttpResponse } from '@angular/common/http';
import { Jugador } from '../../../../shared/model/jugador';

describe('JugadorService', () => {
  let httpMock: HttpTestingController;
  let service: JugadorService;
  const apiEndpointJugadores = `${environment.apiUrl}/jugadores`;

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
      new Jugador(1),
      new Jugador(2)
    ];
    service.consultar(100, 0).subscribe(jugadores => {
      expect(jugadores.length).toBe(2);
      expect(jugadores).toEqual(dummyJugadores);
    });
    const req = httpMock.expectOne(`${apiEndpointJugadores}/100/0`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyJugadores);
  });

  it('deberia listar el equipo', () => {
    const dummyJugadores = [
      new Jugador(1),
      new Jugador(2),
      new Jugador(3),
      new Jugador(4),
      new Jugador(5),
      new Jugador(6),
      new Jugador(7),
      new Jugador(8),
      new Jugador(9),
      new Jugador(10),
      new Jugador(11)
    ];
    service.equipoAleatorio('4', '4', '2').subscribe(respuesta => {
      expect(respuesta.length).toBe(11);
      expect(respuesta).toEqual(dummyJugadores);
    });
    const req = httpMock.expectOne(`${apiEndpointJugadores}/equipo?defensas=4&mediocampistas=4&delanteros=2`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyJugadores);
  });

  it('deberia listar por categoria', () => {
    const dummyJugadores = [
      new Jugador(2),
      new Jugador(3),
      new Jugador(4)
    ];
    service.listarPorCategoria('2012').subscribe(respuesta => {
      expect(respuesta.length).toBe(3);
      expect(respuesta).toEqual(dummyJugadores);
    });
    const req = httpMock.expectOne(`${apiEndpointJugadores}/categoria/2012`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyJugadores);
  });

  it('deberia obtener un jugador', () => {
    const jugador = new Jugador(1);
    jugador.documento = 1010101;
    service.obtenerPorDocumento(jugador.documento).subscribe((jugadores) => {
      expect(jugadores).toEqual(jugador);
    });
    const req = httpMock.expectOne(`${apiEndpointJugadores}/jugador/1010101`);
    expect(req.request.method).toBe('GET');
    req.flush(jugador);
  });

  it('deberia crear un jugador', () => {
    const dummyJugador = new Jugador(1);
    dummyJugador.documento = 1010776655;
    dummyJugador.nombre = 'Esteban';
    dummyJugador.apellido = 'Beltran';
    dummyJugador.fechaNacimiento = '2010-08-11';
    dummyJugador.altura = 1.81;
    dummyJugador.peso = 67.7;
    dummyJugador.pieHabil = 'Derecho';
    dummyJugador.posicion = 'Delantero';
    service.guardar(dummyJugador).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointJugadores);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia eliminar un jugador', () => {
    const dummyJugador = new Jugador(1);
    service.eliminar(dummyJugador.id).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointJugadores}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});
