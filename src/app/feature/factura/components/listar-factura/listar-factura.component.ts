import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MensajeService } from '@core/services/mensaje.service';
import { Observable } from 'rxjs';
import { Factura } from '../../shared/model/factura';
import { FacturaService } from '../../shared/service/factura.service';
import { BorrarFacturaComponent } from '../borrar-factura/borrar-factura.component';

@Component({
  selector: 'app-listar-factura',
  templateUrl: './listar-factura.component.html',
  styleUrls: ['./listar-factura.component.css']
})
export class ListarFacturaComponent implements OnInit {

  public listaFacturas: Observable<Factura[]>;
  listarFacturas: Factura[];

  @ViewChild(MatSort, { static : true }) sort: MatSort;
  displayedColumns: string[] = ['documento', 'nombre', 'apellido', 'fechaIngreso',
                                'fechaCaducidad', 'valor', 'acciones'];
  dataSource = new MatTableDataSource<Factura>();

  constructor(protected facturaService: FacturaService,
              protected router: Router,
              protected mensajeService: MensajeService,
              public dialogo: MatDialog) { }

  ngOnInit(){
    this.listaFacturas = this.facturaService.consultar();
    this.facturaService.consultar().subscribe(data => {
      this.listarFacturas = data;
    });
  }

  listar(){
    return this.facturaService.consultar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

  eliminar(id: number){
    this.facturaService.eliminar(id).subscribe(() => {
      this.router.navigateByUrl('/home', { replaceUrl: true });
      this.mensajeService.openSnackBar('Factura eliminada correctamente', 'Success');
    });
  }

  mostrarDialogo(id: number): void {
    this.dialogo
      .open(BorrarFacturaComponent, {
        data: `¿Deseas eliminar la factura?`
      })
      .afterClosed()
      .subscribe((confirmado: boolean) => {
        if (confirmado) {
          this.eliminar(id);
          alert('¡Si!');
        } else {
          alert('Cancelar');
        }
      });
  }

}
