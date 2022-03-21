import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CrearJugadorComponent } from './crear-jugador.component';
import { JugadorService } from '../../shared/service/jugador.service';
import { SharedModule } from '@shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Jugador } from '@shared/model/jugador';

describe('CrearJugadorComponent', () => {
  let component: CrearJugadorComponent;
  let fixture: ComponentFixture<CrearJugadorComponent>;
  let jugadorService: JugadorService;
  const jugador = new Jugador(1);
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearJugadorComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      providers: [JugadorService, HttpService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearJugadorComponent);
    component = fixture.componentInstance;
    jugadorService = TestBed.inject(JugadorService);
    spyOn(jugadorService, 'obtenerPorDocumento').and.returnValue(
      of(jugador)
    );
    spyOn(jugadorService, 'guardar').and.returnValue(
      of(true)
    );
    spyOn(jugadorService, 'actualizar').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.jugadorForm.valid).toBeFalsy();
  });

  it('Registrando jugador', () => {
    expect(component.jugadorForm.valid).toBeFalsy();
    component.jugadorForm.get('documento').setValue(102998883);
    component.jugadorForm.get('nombre').setValue('Carlos');
    component.jugadorForm.get('apellido').setValue('Farias');
    component.jugadorForm.get('fechaNacimiento').setValue('2012-02-01');
    component.jugadorForm.get('peso').setValue(54.2);
    component.jugadorForm.get('altura').setValue(1.72);
    component.jugadorForm.get('posicion').setValue('Delantero');
    component.jugadorForm.get('pieHabil').setValue('Derecho');
    expect(component.jugadorForm.valid).toBeTruthy();

    component.crear();

    // Aca validamos el resultado esperado al enviar la petición
    // TODO adicionar expect
  });

  it ('deberia cargar los datos en cada campo', () => {
    component.cargarDatos();
    expect(1).toBe(jugador.id);
  });
});
