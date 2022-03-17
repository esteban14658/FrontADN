import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class MensajeService{

    constructor(protected snackBar: MatSnackBar) {}

    openSnackBar(mensaje: string, alerta: string) {
        return this.snackBar.open(mensaje, alerta, {
            duration: 2000
        });
    }
}
