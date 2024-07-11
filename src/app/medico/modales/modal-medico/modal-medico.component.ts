import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Especialidad } from '../../../especialidad/interfaces/especialidad';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Medico } from '../../interfaces/medico';
import { EspecialidadService } from '../../../especialidad/services/especialidad.service';
import { MedicoService } from '../../servicios/medico.service';
import { CompartidoService } from '../../../compartido/compartido.service';

@Component({
  selector: 'app-modal-medico',
  templateUrl: './modal-medico.component.html',
  styleUrl: './modal-medico.component.css',
})
export class ModalMedicoComponent implements OnInit {
  formMedico: FormGroup;
  titulo: string = 'Agregar';
  nombreBoton: string = 'Guardar';
  listaEspecialidades: Especialidad[] = [];

  constructor(
    private modal: MatDialogRef<ModalMedicoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosMedico: Medico,
    private fb: FormBuilder,
    private _especialidadServicio: EspecialidadService,
    private _medicoServicio: MedicoService,
    private _compartidoServicio: CompartidoService
  ) {
    this.formMedico = this.fb.group({
      apellidos: ['', Validators.required],
      nombres: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: [''],
      genero: ['M', Validators.required],
      especialidadId: ['', Validators.required],
      estado: ['1', Validators.required],
    });

    if (this.datosMedico != null) {
      this.titulo = 'Editar';
      this.nombreBoton = 'Actualizar';
    }
    this._especialidadServicio.listaActivos().subscribe({
      next: (data) => {
        if (data.isExitoso) this.listaEspecialidades = data.resultado;
      },
      error: (e) => {},
    });
  }

  ngOnInit(): void {
    if (this.datosMedico != null) {
      this.formMedico.patchValue({
        apellidos: this.datosMedico.apellidos,
        nombres: this.datosMedico.nombres,
        direccion: this.datosMedico.direccion,
        telefono: this.datosMedico.telefono,
        genero: this.datosMedico.genero,
        especialidadId: this.datosMedico.especialidadId,
        estado: this.datosMedico.estado.toString(),
      });
    }
  }

  crearModificarMedico() {
    const medico: Medico = {
      id: this.datosMedico == null ? 0 : this.datosMedico.id,
      apellidos: this.formMedico.value.apellidos,
      nombres: this.formMedico.value.nombres,
      direccion: this.formMedico.value.direccion,
      telefono: this.formMedico.value.telefono,
      genero: this.formMedico.value.genero,
      especialidadId: parseInt(this.formMedico.value.especialidadId),
      estado: parseInt(this.formMedico.value.estado),
      nombreEspecialidad: '',
    };

    if (this.datosMedico == null) {
      //nuevo registro
      this._medicoServicio.crear(medico).subscribe({
        next: (data) => {
          if (data.isExitoso) {
            this._compartidoServicio.mostrarAlerta(
              'Medico ha sido creada con éxito!',
              'Completo'
            );
            this.modal.close('true');
          } else {
            this._compartidoServicio.mostrarAlerta(
              'No se pudo crear el Medico',
              'Error'
            );
          }
        },
        error: (e) => {
          this._compartidoServicio.mostrarAlerta(e.error.errores, 'Error');
        },
      });
    } else {
      this._medicoServicio.editar(medico).subscribe({
        next: (data) => {
          if (data.isExitoso) {
            this._compartidoServicio.mostrarAlerta(
              'Medico ha sido actualizada con éxito!',
              'Completo'
            );
            this.modal.close('true');
          } else {
            this._compartidoServicio.mostrarAlerta(
              'No se pudo actualizar el Medico',
              'Error'
            );
          }
        },
        error: (e) => {
          this._compartidoServicio.mostrarAlerta(e.error.errores, 'Error');
        },
      });
    }
  }
}
