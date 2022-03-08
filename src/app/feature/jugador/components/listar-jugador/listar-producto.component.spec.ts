import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { ListarJugadorComponent } from './listar-jugador.component';
import { JugadorService } from '../../shared/service/jugador.service';
import { Jugador } from '../../shared/model/jugador';

describe('ListarProductoComponent', () => {
  let component: ListarJugadorComponent;
  let fixture: ComponentFixture<ListarJugadorComponent>;
  let jugadorService: JugadorService;
  const listaJugadores: Jugador[] = [
    new Jugador(1, 1010101, 'Esteban', 'Beltran', new Date(), 67.3, 1.80, 'Delantero', 'Derecho'), 
    new Jugador(2, 1010102, 'Juan', 'Beltran', new Date(), 45.3, 1.65, 'Portero', 'Derecho')
    ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListarJugadorComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
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
    component.listaJugadores.subscribe(resultado => {
      expect(2).toBe(resultado.length);
  });
});

});
