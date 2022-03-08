import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JugadorService } from '../../shared/service/jugador.service';

@Component({
  selector: 'app-borrar-jugador',
  templateUrl: './borrar-jugador.component.html',
  styleUrls: ['./borrar-jugador.component.css']
})
export class BorrarJugadorComponent implements OnInit {

  quantity: number;
  form: FormGroup;

  constructor(protected jugadorService: JugadorService) { }

  ngOnInit(): void {
    console.log(this.quantity);
  }

  eliminar(id: number){
    console.log(this.quantity);
    this.jugadorService.eliminar(id).subscribe();
  }
}
