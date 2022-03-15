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
  const apiEndpointJugadorConsulta = `${environment.apiUrl}/jugadores`;
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
      new Jugador(1, 1010101, 'Esteban', 'Beltran', '2010-08-11', 67.3, 1.80, 'Delantero', 'Derecho'),
      new Jugador(2, 1010102, 'Juan', 'Beltran', '2012-03-11', 45.3, 1.65, 'Portero', 'Derecho')
    ];
    service.consultar().subscribe(jugadores => {
      expect(jugadores.length).toBe(2);
      expect(jugadores).toEqual(dummyJugadores);
    });
    const req = httpMock.expectOne(apiEndpointJugadorConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyJugadores);
  });

  it('deberia listar el equipo', () => {
    const dummyJugadores = [
      new Jugador(1, 1010101, 'Esteban', 'Beltran', '2010-08-11', 67.3, 1.80, 'Portero', 'Derecho'),
      new Jugador(2, 1010102, 'Juan', 'Beltran', '2012-03-11', 45.3, 1.65, 'Defensa', 'Derecho'),
      new Jugador(3, 1010103, 'Esteban', 'Beltran', '2010-08-11', 67.3, 1.80, 'Defensa', 'Derecho'),
      new Jugador(4, 1010104, 'Juan', 'Beltran', '2012-03-11', 45.3, 1.65, 'Defensa', 'Derecho'),
      new Jugador(5, 1010105, 'Esteban', 'Beltran', '2010-08-11', 67.3, 1.80, 'Defensa', 'Derecho'),
      new Jugador(6, 1010106, 'Juan', 'Beltran', '2012-03-11', 45.3, 1.65, 'Mediocampista', 'Derecho'),
      new Jugador(7, 1010107, 'Esteban', 'Beltran', '2010-08-11', 67.3, 1.80, 'Mediocampista', 'Derecho'),
      new Jugador(8, 1010108, 'Juan', 'Beltran', '2012-03-11', 45.3, 1.65, 'Mediocampista', 'Derecho'),
      new Jugador(9, 1010109, 'Esteban', 'Beltran', '2010-08-11', 67.3, 1.80, 'Delantero', 'Derecho'),
      new Jugador(10, 10101010, 'Juan', 'Beltran', '2012-03-11', 45.3, 1.65, 'Delantero', 'Derecho'),
      new Jugador(11, 10101011, 'Esteban', 'Beltran', '2010-08-11', 67.3, 1.80, 'Delantero', 'Derecho')
    ];
    service.equipoAleatorio('4', '4', '2').subscribe(respuesta => {
      expect(respuesta.length).toBe(11);
      expect(respuesta).toEqual(dummyJugadores);
    });
    const req = httpMock.expectOne(`${apiEndpointJugadores}/equipo?defensas=4&mediocampistas=4&delanteros=2`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyJugadores);
  });

  it('deberia listar posicion', () => {
    const dummyJugadores = [
      new Jugador(2, 1010102, 'Juan', 'Beltran', '2012-03-11', 45.3, 1.65, 'Defensa', 'Derecho'),
      new Jugador(3, 1010103, 'Esteban', 'Beltran', '2010-08-11', 67.3, 1.80, 'Defensa', 'Derecho'),
      new Jugador(4, 1010104, 'Juan', 'Beltran', '2012-03-11', 45.3, 1.65, 'Defensa', 'Derecho')
    ];
    service.listarPorPosicion('Defensa').subscribe(respuesta => {
      expect(respuesta.length).toBe(3);
      expect(respuesta).toEqual(dummyJugadores);
    });
    const req = httpMock.expectOne(`${apiEndpointJugadores}/Defensa`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyJugadores);
  });

  it('deberia listar por pie habil', () => {
    const dummyJugadores = [
      new Jugador(2, 1010102, 'Juan', 'Beltran', '2012-03-11', 45.3, 1.65, 'Defensa', 'Derecho'),
      new Jugador(3, 1010103, 'Esteban', 'Beltran', '2010-08-11', 67.3, 1.80, 'Defensa', 'Derecho'), 
      new Jugador(4, 1010104, 'Juan', 'Beltran', '2012-03-11', 45.3, 1.65, 'Defensa', 'Derecho')
    ];
    service.listarPorPieHabil('Derecho').subscribe(respuesta => {
      expect(respuesta.length).toBe(3);
      expect(respuesta).toEqual(dummyJugadores);
    });
    const req = httpMock.expectOne(`${apiEndpointJugadores}/jugadores/Derecho`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyJugadores);
  });

  it('deberia listar por categoria', () => {
    const dummyJugadores = [
      new Jugador(2, 1010102, 'Juan', 'Beltran', '2012-03-11', 45.3, 1.65, 'Defensa', 'Derecho'),
      new Jugador(3, 1010103, 'Esteban', 'Beltran', '2010-08-11', 67.3, 1.80, 'Defensa', 'Derecho'),
      new Jugador(4, 1010104, 'Juan', 'Beltran', '2012-03-11', 45.3, 1.65, 'Defensa', 'Derecho')
    ];
    service.listarPorCategoria('2012').subscribe(respuesta => {
      expect(respuesta.length).toBe(3);
      expect(respuesta).toEqual(dummyJugadores);
    });
    const req = httpMock.expectOne(`${apiEndpointJugadores}/categoria/2012`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyJugadores);
  });

  it('deberia listar jugadores sin asistencias', () => {
    const dummyJugadores = [
      new Jugador(2, 1010102, 'Juan', 'Beltran', '2012-03-11', 45.3, 1.65, 'Defensa', 'Derecho'),
      new Jugador(3, 1010103, 'Esteban', 'Beltran', '2010-08-11', 67.3, 1.80, 'Defensa', 'Derecho'),
      new Jugador(4, 1010104, 'Juan', 'Beltran', '2012-03-11', 45.3, 1.65, 'Defensa', 'Derecho')
    ];
    service.listarJugadoresSinAsistencia().subscribe(respuesta => {
      expect(respuesta.length).toBe(3);
      expect(respuesta).toEqual(dummyJugadores);
    });
    const req = httpMock.expectOne(`${apiEndpointJugadores}/asistencia`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyJugadores);
});

  it('deberia obtener un jugador', () => {
    const jugador = new Jugador(1, 1010101, 'Esteban', 'Beltran', '2010-08-11', 67.3, 1.80, 'Delantero', 'Derecho');
    service.obtenerPorDocumento(jugador.documento).subscribe((jugadores) => {
      expect(jugadores).toEqual(jugador);
    });
    const req = httpMock.expectOne(`${apiEndpointJugadores}/jugador/1010101`);
    expect(req.request.method).toBe('GET');
    req.flush(jugador);
  });

  it('deberia crear un jugador', () => {
    const dummyJugador = new Jugador(1, 1010101, 'Esteban', 'Beltran', '2010-08-11', 67.3, 1.80, 'Delantero', 'Derecho');
    service.guardar(dummyJugador).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointJugadores);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia eliminar un jugador', () => {
    const dummyJugador = new Jugador(1, 1010101, 'Esteban', 'Beltran', '2010-08-11', 67.3, 1.80, 'Delantero', 'Derecho');
    service.eliminar(dummyJugador.id).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointJugadores}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});
