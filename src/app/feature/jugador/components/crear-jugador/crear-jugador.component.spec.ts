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

describe('CrearJugadorComponent', () => {
  let component: CrearJugadorComponent;
  let fixture: ComponentFixture<CrearJugadorComponent>;
  let jugadorService: JugadorService;

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
    spyOn(jugadorService, 'guardar').and.returnValue(
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
    component.jugadorForm.controls.id.setValue(1);
    component.jugadorForm.controls.documento.setValue(10101020);
    component.jugadorForm.controls.nombre.setValue('Ricardo');
    component.jugadorForm.controls.apellido.setValue('Marquez');
    component.jugadorForm.controls.fechaNacimiento.setValue('2013-02-13');
    component.jugadorForm.controls.peso.setValue(45.7);
    component.jugadorForm.controls.altura.setValue(1.84);
    component.jugadorForm.controls.posicion.setValue('Delantero');
    component.jugadorForm.controls.pieHabil.setValue('Derecho');
    expect(component.jugadorForm.valid).toBeTruthy();

    component.crear();

    // Aca validamos el resultado esperado al enviar la petición
    // TODO adicionar expect
  });
});