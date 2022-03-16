import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { Jugador } from 'src/app/feature/jugador/shared/model/jugador';
import { environment } from 'src/environments/environment';
import { Factura } from '../model/factura';
import { FacturaService } from './factura.service';


describe('FacturaService', () => {
    let httpMock: HttpTestingController;
    let service: FacturaService;
    const apiEndpointFacturas = `${environment.apiUrl}/facturas`;

    beforeEach(() => {
      const injector = TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [FacturaService, HttpService]
      });
      httpMock = injector.inject(HttpTestingController);
      service = TestBed.inject(FacturaService);
    });

    it('should be created', () => {
      const facturaService: FacturaService = TestBed.inject(FacturaService);
      expect(facturaService).toBeTruthy();
    });

    it('deberia listar facturas', () => {
        const jugador1 = new Jugador(1);
        const jugador2 = new Jugador(2);
        const dummyFacturas = [
            new Factura(1, jugador1, 'Tres meses', 3),
            new Factura(2, jugador2, 'Tres meses', 3)
        ];
        service.consultar().subscribe(respuesta => {
            expect(respuesta.length).toBe(2);
            expect(respuesta).toEqual(dummyFacturas);
        });
        const req = httpMock.expectOne(apiEndpointFacturas);
        expect(req.request.method).toBe('GET');
        req.flush(dummyFacturas);
    });

    it('deberia listar jugadores sin facturas', () => {
        const dummyJugadores = [
          new Jugador(2),
          new Jugador(3),
          new Jugador(4)
        ];
        service.listarJugadoresSinFactura().subscribe(respuesta => {
          expect(respuesta.length).toBe(3);
          expect(respuesta).toEqual(dummyJugadores);
        });
        const req = httpMock.expectOne(`${apiEndpointFacturas}/factura`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyJugadores);
    });

    it('deberia crear una factura', () => {
      const jugador = new Jugador(1);
      const dummyFactura = new Factura(1, jugador, 'Tres meses', 3);
      service.guardar(dummyFactura).subscribe((respuesta) => {
        expect(respuesta).toEqual(true);
      });
      const req = httpMock.expectOne(apiEndpointFacturas);
      expect(req.request.method).toBe('POST');
      req.event(new HttpResponse<boolean>({body: true}));
    });

    it('deberia eliminar un jugador', () => {
      const jugador = new Jugador(1);
      const dummyFactura = new Factura(1, jugador, 'Tres meses', 3);
        service.eliminar(dummyFactura.id).subscribe((respuesta) => {
          expect(respuesta).toEqual(true);
        });
        const req = httpMock.expectOne(`${apiEndpointFacturas}/1`);
        expect(req.request.method).toBe('DELETE');
        req.event(new HttpResponse<boolean>({body: true}));
    });

});
