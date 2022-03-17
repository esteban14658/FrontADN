import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Jugador } from '../../../../shared/model/jugador';
import { JugadorService } from '../../shared/service/jugador.service';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 20;

const VALOR_MINIMO_PERMITIDO_DE_PESO = 25;
const VALOR_MAXIMO_PERMITIDO_DE_PESO = 300;
const VALOR_MINIMO_PERMITIDO_DE_ALTURA = 0.5;
const VALOR_MAXIMO_PERMITIDO_DE_ALTURA = 3;
const VALOR_MAXIMO_PERMITIDO_DE_DOCUMENTO = 999999999;
const VALOR_MINIMO_PERMITIDO_DE_DOCUMENTO = 10000000;
@Component({
  selector: 'app-crear-jugador',
  templateUrl: './crear-jugador.component.html',
  styleUrls: ['./crear-jugador.component.css']
})
export class CrearJugadorComponent implements OnInit {

  jugadorForm: FormGroup;
  seleccionadoPosicion: string;
  seleccionadoPieHabil: string;
  listaPosiciones: string[] = ['Portero', 'Defensa', 'Mediocampista', 'Delantero'];
  listaPieHabil: string[] = ['Derecho', 'Izquierdo'];

  constructor(protected jugadorService: JugadorService) { }

  ngOnInit(){
    this.construirFormularioProducto();
  }

  crear(){
    const jugador = new Jugador(
      this.jugadorForm.value['id']
    );
    jugador.documento = this.jugadorForm.value['documento'];
    jugador.nombre = this.jugadorForm.value['nombre'];
    jugador.apellido = this.jugadorForm.value['apellido'];
    jugador.fechaNacimiento = this.jugadorForm.value['fechaNacimiento'];
    jugador.peso = this.jugadorForm.value['peso'];
    jugador.altura = this.jugadorForm.value['altura'];
    jugador.posicion = this.jugadorForm.value['posicion'];
    jugador.pieHabil = this.jugadorForm.value['pieHabil'];
    this.jugadorService.guardar(jugador).subscribe(() => {
      this.jugadorForm.reset();
    });
  }

  private construirFormularioProducto() {
    this.jugadorForm = new FormGroup({
      'documento': new FormControl('', [Validators.required, Validators.min(VALOR_MINIMO_PERMITIDO_DE_DOCUMENTO),
                                                              Validators.max(VALOR_MAXIMO_PERMITIDO_DE_DOCUMENTO)]),
      'nombre': new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                                        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
      'apellido': new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                                          Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
      'fechaNacimiento': new FormControl('', [Validators.required]),
      'peso': new FormControl('', [Validators.required, Validators.min(VALOR_MINIMO_PERMITIDO_DE_PESO), 
                                                        Validators.max(VALOR_MAXIMO_PERMITIDO_DE_PESO)]),
      'altura': new FormControl('', [Validators.required, Validators.min(VALOR_MINIMO_PERMITIDO_DE_ALTURA), 
                                                          Validators.max(VALOR_MAXIMO_PERMITIDO_DE_ALTURA)]),
      'posicion': new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                                        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
      'pieHabil': new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                                          Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)])
    });
  }

  get documento(){
    return this.jugadorForm.get('documento');
  }

  get nombre(){
    return this.jugadorForm.get('nombre');
  }

  get apellido(){
    return this.jugadorForm.get('apellido');
  }

  get fechaNacimiento(){
    return this.jugadorForm.get('fechaNacimiento');
  }

  get peso(){
    return this.jugadorForm.get('peso');
  }

  get altura(){
    return this.jugadorForm.get('altura');
  }

  get posicion(){
    return this.jugadorForm.get('posicion');
  }

  get pieHabil(){
    return this.jugadorForm.get('pieHabil');
  }

}
