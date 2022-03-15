import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { ListarJugadorComponent } from './listar-jugador.component';
import { JugadorService } from '../../shared/service/jugador.service';
import { Jugador } from '../../shared/model/jugador';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('ListarJugadorComponent', () => {
    let component: ListarJugadorComponent;
    let fixture: ComponentFixture<ListarJugadorComponent>;
    let jugadorService: JugadorService;
    const listaJugadores: any[] = [
        new Jugador(1, 1010101, 'Esteban', 'Beltran', '2010-08-11', 67.3, 1.80, 'Portero', 'Derecho'),
        new Jugador(2, 1010102, 'Juan', 'Beltran', '2012-03-11', 45.3, 1.65, 'Defensa', 'Derecho')
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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(2).toBe(component.listaJugadores.length);
    });

});
