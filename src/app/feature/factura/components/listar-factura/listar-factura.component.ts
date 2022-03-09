import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Factura } from '../../shared/model/factura';
import { FacturaService } from '../../shared/service/factura.service';

@Component({
  selector: 'app-listar-factura',
  templateUrl: './listar-factura.component.html',
  styleUrls: ['./listar-factura.component.css']
})
export class ListarFacturaComponent implements OnInit {

  public listaFacturas: Observable<Factura[]>;

  @ViewChild(MatSort, { static : true }) sort: MatSort;
  displayedColumns: string[] = ['documento', 'nombre', 'apellido', 'fechaIngreso', 
                                'fechaCaducidad', 'valor'];
  dataSource = new MatTableDataSource<Factura>()

  constructor(protected facturaService: FacturaService) { }

  ngOnInit(){
    this.listaFacturas = this.facturaService.consultar();
    console.log(this.listar());
    console.log(this.listaFacturas);
  }

  listar(){
    return this.facturaService.consultar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

}
