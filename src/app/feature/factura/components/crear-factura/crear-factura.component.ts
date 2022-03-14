import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Jugador } from 'src/app/feature/jugador/shared/model/jugador';
import { JugadorService } from 'src/app/feature/jugador/shared/service/jugador.service';
import { Factura } from '../../shared/model/factura';
import { FacturaService } from '../../shared/service/factura.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { MensajeService } from '@core/services/mensaje.service';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent implements OnInit {

  constructor(protected facturaService: FacturaService, 
              protected jugadorService: JugadorService,
              protected mensajeService: MensajeService,
              private router: Router) { }

  public listaJugadores: Observable<Jugador[]>;

  displayedJugadores: Jugador[];

  meses: number[] = [1, 3, 6];

  facturaForm: FormGroup;
  seleccionado: Jugador;
  seleccionMeses: number;

  myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  ngOnInit(){
    this.facturaService.listarJugadoresSinFactura().subscribe(data => {
      this.displayedJugadores = data;
    });
    this.listaJugadores = this.facturaService.listarJugadoresSinFactura();
    this.construirFormulario();
  }

  crear(){
    let factura = new Factura(
      this.facturaForm.value['id'],
      this.facturaForm.value['valor'],
      this.facturaForm.value['fechaIngreso'],
      this.facturaForm.value['fechaCaducidad'],
      this.facturaForm.value['jugador'],
      this.facturaForm.value['estado'],
      this.facturaForm.value['descripcion'],
      this.facturaForm.value['meses']
    );
    factura.id = 1;
    factura.valor = 100000;
    factura.fechaIngreso = '2022-04-25';
    factura.fechaCaducidad = '2022-07-25';
    factura.estado = 1;
    factura.jugador = this.seleccionado;
    this.facturaService.guardar(factura).subscribe(() => {
      this.facturaForm.reset();
      this.mensajeService.openSnackBar('Factura creada correctamente', 'Success');
      this.router.navigateByUrl('/home', { replaceUrl: true });
    });
  }

  construirFormulario(){
    this.facturaForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.min(0), Validators.max(1000000)]),
      fechaIngreso: new FormControl('', [Validators.required]),
      fechaCaducidad: new FormControl('', [Validators.required]),
      jugador: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.min(0), Validators.max(1)]),
      descripcion: new FormControl('', [Validators.required]),
      meses: new FormControl('', [Validators.required, Validators.min(1),
                                  Validators.max(6)])
    });
  }

  get id(){
    return this.facturaForm.get('id');
  }

  get valor(){
    return this.facturaForm.get('valor');
  }

  get fechaIngreso(){
    return this.facturaForm.get('fechaIngreso');
  }

  get fechaCaducidad(){
    return this.facturaForm.get('fechaCaducidad');
  }

  get jugador(){
    return this.facturaForm.get('jugador');
  }

  get estado(){
    return this.facturaForm.get('estado');
  }

  get descripcion(){
    return this.facturaForm.get('descripcion');
  }

}
