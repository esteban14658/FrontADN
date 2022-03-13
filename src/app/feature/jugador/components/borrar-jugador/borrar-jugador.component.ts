import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-borrar-jugador',
  templateUrl: './borrar-jugador.component.html',
  styleUrls: ['./borrar-jugador.component.css']
})
export class BorrarJugadorComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<BorrarJugadorComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { }

    cerrarDialogo(): void {
      this.dialogo.close(false);
    }
    confirmado(): void {
      this.dialogo.close(true);
    }

  ngOnInit() {
  }
}
