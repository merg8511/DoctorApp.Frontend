import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Especialidad } from '../../interfaces/especialidad';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EspecialidadService } from '../../services/especialidad.service';
import { CompartidoService } from '../../../compartido/compartido.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalEspecialidadComponent } from '../../modales/modal-especialidad/modal-especialidad.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-especialidad',
  templateUrl: './listado-especialidad.component.html',
  styleUrl: './listado-especialidad.component.css',
})
export class ListadoEspecialidadComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'nombreEspecialidad',
    'descripcion',
    'estado',
    'acciones',
  ];

  dataInicial: Especialidad[] = [];
  dataSource = new MatTableDataSource(this.dataInicial);
  @ViewChild(MatPaginator) paginacionTable!: MatPaginator;

  constructor(
    private _service: EspecialidadService,
    private _compartido: CompartidoService,
    private dialog: MatDialog
  ) {}

  nuevoEspecialidad() {
    this.dialog
      .open(ModalEspecialidadComponent, { disableClose: true, width: '400px' })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') this.obtenerEspecialidades();
      });
  }

  editarEspecialidad(especialidad: Especialidad) {
    this.dialog
      .open(ModalEspecialidadComponent, {
        disableClose: true,
        width: '400px',
        data: especialidad,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') this.obtenerEspecialidades();
      });
  }

  obtenerEspecialidades() {
    this._service.lista().subscribe({
      next: (data) => {
        if (data.isExitoso) {
          this.dataSource = new MatTableDataSource(data.resultado);
          this.dataSource.paginator = this.paginacionTable;
        } else {
          this._compartido.mostrarAlerta(
            'No se encontraron datos',
            'Advertencia'
          );
        }
      },
      error: (e) => {},
    });
  }

  removerEspecialidad(especialidad: Especialidad) {
    Swal.fire({
      title: 'Desea eliminar la especialidad?',
      text: especialidad.nombreEspecialidad,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, confirmar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._service.eliminar(especialidad.id).subscribe({
          next: (data) => {
            if (data.isExitoso) {
              this._compartido.mostrarAlerta(
                'La especialidad fue eliminada',
                'Completo'
              );
              this.obtenerEspecialidades();
            } else {
              this._compartido.mostrarAlerta(
                'No se pudo eliminar la especialidad',
                'Error'
              );
            }
          },
          error: (e) => {},
        });
      }
    });
  }

  aplicarFiltroListado(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.obtenerEspecialidades();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginacionTable;
  }
}
