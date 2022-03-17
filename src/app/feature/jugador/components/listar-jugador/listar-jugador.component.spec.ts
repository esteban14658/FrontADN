import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { ListarJugadorComponent } from './listar-jugador.component';
import { JugadorService } from '../../shared/service/jugador.service';
import { Jugador } from '@shared/model/jugador';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('ListarJugadorComponent', () => {
    let component: ListarJugadorComponent;
    let fixture: ComponentFixture<ListarJugadorComponent>;
    let jugadorService: JugadorService;
    const listaJugadores: any[] = [
        new Jugador(1),
        new Jugador(2)
      ];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
        declarations: [ListarJugadorComponent],
        imports: [
            CommonModule,
            HttpClientModule,
            RouterTestingModule,
            SharedModule,
            BrowserAnimationsModule
        ],
        providers: [JugadorService, HttpService]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListarJugadorComponent);
        component = fixture.componentInstance;
        jugadorService = TestBed.inject(JugadorService);
        spyOn(jugadorService, 'consultar').and.returnValue(
        of(listaJugadores)
        );
        spyOn(jugadorService, 'listarPorCategoria').and.returnValue(
        of(listaJugadores)
        );
        spyOn(jugadorService, 'eliminar').and.returnValue(
        of(true)
        );
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(2).toBe(component.listaJugadores.length);
    });

    it('deberia listar por categoria', () => {
        const fecha = '2010';
        const lista = component.elegirCategoria(fecha);
        expect(true).toBe(lista.closed.valueOf());
    });

    it('deberia listar por posicion', () => {
        const posicion = 'Delantero';
        const lista = component.elegirPosicion(posicion);
        expect(lista.unsubscribe.length).toBe(component.listaJugadores.length);
    });

    it('deberia listar por pie habil', () => {
        const pieHabil = 'Derecho';
        const lista = component.elegirPieHabil(pieHabil);
        expect(true).toBe(lista.closed.valueOf());
    });

    it('deberia eliminar', () => {
        const retorno = component.eliminar(1);
        expect(retorno).toBe(true);
    });
});
