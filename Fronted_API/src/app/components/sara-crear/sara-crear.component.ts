import { Component, Output, EventEmitter, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
//import { MatNativeDateModule, MatIconModule } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Microscopio } from '../../models/microscopio.model';

@Component({
  selector: 'app-sara-crear',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './sara-crear.component.html',
  styleUrl: './sara-crear.component.scss'
})
export class SaraCrearComponent {
  @Output() microscopioCreado = new EventEmitter<Microscopio>();
  @Output() microscopioEditado = new EventEmitter<Microscopio>();

  @Input() set microscopio(value: Microscopio | undefined) {
    if (value) {
      this._microscopio = value;
      this.esEdicion = true;
      this.formulario.patchValue({
        codigo: value.codigo,
        marca: value.marca,
        precio: value.precio,
        fechaFabricacion: value.fechaFabricacion
          ? new Date(value.fechaFabricacion)
          : null,
        estado: String(value.estado)
      });
    } else {
      this._microscopio = undefined;
      this.esEdicion = false;
      this.formulario.reset({ precio: 0, estado: 'true' });
    }
  }

  _microscopio?: Microscopio;
  esEdicion = false;

  readonly marcas = ['OLYMPUS', 'NIKON', 'LEICA', 'ZEISS', 'CARL ZEISS'];

  private fb = inject(FormBuilder);

  formulario: FormGroup = this.fb.group({
    codigo: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{7}$/)]],
    marca: ['', Validators.required],
    precio: [0, [Validators.required, Validators.min(0.01)]],
    fechaFabricacion: ['', [Validators.required, this.fechaMenorA2022()]],
    estado: ['true', Validators.required]
  });

  get codigo() {
    return this.formulario.get('codigo');
  }

  get marca() {
    return this.formulario.get('marca');
  }

  get precio() {
    return this.formulario.get('precio');
  }

  get fechaFabricacion() {
    return this.formulario.get('fechaFabricacion');
  }

  get estado() {
    return this.formulario.get('estado');
  }

  guardar(): void {
    this.formulario.markAllAsTouched();

    if (this.formulario.invalid) {
      return;
    }

    const valor = this.formulario.getRawValue();

    const microscopio: Microscopio = {
      id: this._microscopio?.id,
      codigo: valor.codigo,
      marca: valor.marca,
      precio: Number(valor.precio),
      fechaFabricacion: this.formatearFecha(valor.fechaFabricacion),
      estado: valor.estado === 'true'
    };

    if (this.esEdicion) {
      this.microscopioEditado.emit(microscopio);
    } else {
      this.microscopioCreado.emit(microscopio);
      this.formulario.reset({ precio: 0, estado: 'true' });
    }
  }

  private formatearFecha(fecha: Date): string {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  }

  private fechaMenorA2022() {
    return (control: any) => {
      if (!control.value) return null;

      const fecha = new Date(control.value);
      const limite = new Date(2026, 1, 14);

      return fecha < limite ? null : { fechaInvalida: true };
    };
  }
}
