import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Jugador } from '../../shared/model/jugador';
import { JugadorService } from '../../shared/service/jugador.service';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 20;

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
    let jugador = new Jugador(
      this.jugadorForm.value['id'],
      this.jugadorForm.value['documento'],
      this.jugadorForm.value['nombre'],
      this.jugadorForm.value['apellido'],
      this.jugadorForm.value['fechaNacimiento'],
      this.jugadorForm.value['peso'],
      this.jugadorForm.value['altura'],
      this.jugadorForm.value['posicion'],
      this.jugadorForm.value['pieHabil']
    );
    this.jugadorService.guardar(jugador).subscribe(() => {
      this.jugadorForm.reset();
    });
  }

  private construirFormularioProducto() {
    this.jugadorForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      documento: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                                        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                                          Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      peso: new FormControl('', [Validators.required]),
      altura: new FormControl('', [Validators.required]),
      posicion: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                                        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
      pieHabil: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
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
