import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Jugador } from '@shared/model/jugador';
import { Factura } from '../../shared/model/factura';
import { FacturaService } from '../../shared/service/factura.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { MensajeService } from '@core/services/mensaje.service';

const UN_MES = 1;
const TRES_MESES = 3;
const SEIS_MESES = 6;

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent implements OnInit {

  constructor(protected facturaService: FacturaService,
              protected mensajeService: MensajeService,
              private router: Router) { }

  public listaJugadores: Observable<Jugador[]>;

  displayedJugadores: Jugador[];

  meses: number[] = [UN_MES, TRES_MESES, SEIS_MESES];

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
    const factura = new Factura(1,
      this.seleccionado,
      this.facturaForm.value['descripcion'],
      this.facturaForm.value['meses']);
    factura.valor = 100000;
    factura.fechaIngreso = '2022-04-25';
    factura.fechaCaducidad = '2022-07-25';
    factura.estado = 1;

    if (this.seleccionado !== null){
      this.facturaService.guardar(factura).subscribe(() => {
        this.facturaForm.reset();
        this.mensajeService.openSnackBar('Factura creada correctamente', 'Success');
        this.router.navigateByUrl('/home', { replaceUrl: true });
      });
    } else {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }
  }

  construirFormulario(){
    console.warn('Entro al componente');
    this.facturaForm = new FormGroup({
      jugador: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      meses: new FormControl('', [Validators.required, Validators.min(1),
                                  Validators.max(SEIS_MESES)])
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
