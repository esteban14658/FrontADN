import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-borrar-factura',
  templateUrl: './borrar-factura.component.html',
  styleUrls: ['./borrar-factura.component.css']
})
export class BorrarFacturaComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<BorrarFacturaComponent>,
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
