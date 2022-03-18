import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BorrarJugadorComponent } from './borrar-jugador.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('BorrarJugadorComponent', () => {
  let component: BorrarJugadorComponent;
  let fixture: ComponentFixture<BorrarJugadorComponent>;
  const dialogMock = {
    close: () => { }
};

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarJugadorComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia cerrar el dialogo', () => {
    spyOn(component.dialogo, 'close');
    component.cerrarDialogo();
    expect(component.dialogo.close).toHaveBeenCalled();
  });

  it('deberia abrir el dialogo', () => {
    spyOn(component.dialogo, 'close');
    component.confirmado();
    expect(component.dialogo.close).toHaveBeenCalled();
  });
});
