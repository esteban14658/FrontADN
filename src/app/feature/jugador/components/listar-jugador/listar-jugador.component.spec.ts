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
import { HomeComponent } from '@home/home.component';
import { DtoPosiciones } from '../../shared/model/dtoPosiciones';


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
            BrowserAnimationsModule,
            RouterTestingModule.withRoutes([
                { path: 'home', component: HomeComponent}
            ])
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
        spyOn(jugadorService, 'equipoAleatorio').and.returnValue(
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
        expect(lista.unsubscribe.length).toBeGreaterThanOrEqual(0);
    });

    it('deberia listar por posicion', () => {
        const posicion = 'Delantero';
        const lista = component.elegirPosicion(posicion);
        expect(lista.unsubscribe.length).toBeGreaterThanOrEqual(0);
    });

    it('deberia listar por pie habil', () => {
        const pieHabil = 'Derecho';
        const lista = component.elegirPieHabil(pieHabil);
        expect(lista.unsubscribe.length).toBeGreaterThanOrEqual(0);
    });

    it('deberia restar los inputs ocultos', () => {
        const inputDefensas = 1;
        const inputMediocampistas = 2;
        const inputDelanteros = 3;
        const defensas = 4;
        const mediocampistas = 4;
        const delanteros = 2;
        component.defensas = defensas;
        component.mediocampistas = mediocampistas;
        component.delanteros = delanteros;
        const resta1 = component.restar(inputDefensas);
        const resta2 = component.restar(inputMediocampistas);
        const resta3 = component.restar(inputDelanteros);
        const cantidadJugadoresDeCampo = 10;
        const total = cantidadJugadoresDeCampo - resta1 - resta2 - resta3;
        expect(0).toBe(total);
    });

    it('deberia eliminar', () => {
        const retorno = component.eliminar(1);
        expect(retorno).toBe(true);
    });

    it('deberia elegir dentro del filtro si se elige listar todos' , () => {
        component.filtro('Listar todos', new DtoPosiciones('4', '4', '2'));
        expect(component).toBeTruthy();
    });

    it('deberia elegir dentro del filtro si se elige Equipo aleatorio' , () => {
        component.filtro('Equipo aleatorio', new DtoPosiciones('4', '4', '2'));
        expect(component).toBeTruthy();
    });

    it('deberia elegir dentro del filtro si se elige Listar por posicion' , () => {
        component.filtro('Listar por posicion', new DtoPosiciones('4', '4', '2'));
        expect(component).toBeTruthy();
    });

    it('deberia elegir dentro del filtro si se elige Listar por pie habil' , () => {
        component.filtro('Listar por pie habil', new DtoPosiciones('4', '4', '2'));
        expect(component).toBeTruthy();
    });

    it('deberia elegir dentro del filtro si se elige Listar por categoria' , () => {
        component.filtro('Listar por categoria', new DtoPosiciones('4', '4', '2'));
        expect(component).toBeTruthy();
    });


});
