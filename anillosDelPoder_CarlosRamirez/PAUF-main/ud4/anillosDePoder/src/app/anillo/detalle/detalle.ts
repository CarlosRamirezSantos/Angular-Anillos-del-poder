import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [
    RouterLink, 
    ReactiveFormsModule, 
    SelectModule, 
    InputTextModule, 
    TextareaModule, 
    SelectButtonModule, 
    ButtonModule
  ],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css',
})
export class Detalle {


  razas = ['Elfo', 'Maiar', 'Enano', 'Humano', 'Oscuro'];

  formulario: FormGroup = new FormGroup({
    nombre: new FormControl('', [
      Validators.required, 
      Validators.minLength(3)
    ]),
    portador: new FormControl('', [
      Validators.required
    ]),
    raza: new FormControl(null, [
      Validators.required
    ]),
    poder: new FormControl('', [
      Validators.required, 
      Validators.minLength(5)
    ]),
    corrupcion: new FormControl(0, [
      Validators.required, 
      Validators.min(0), 
      Validators.max(100)
    ])
  });

  enviar() {
    if (this.formulario.valid) {
      alert("Anillo forjado correctamente");
      this.limpiar();
    } else {
      alert("El formulario no es válido, revisa los campos en rojo");
    }
  }
  limpiar() {
    this.formulario.get('nombre')?.setValue('');
    this.formulario.get('portador')?.setValue('');
    this.formulario.get('raza')?.setValue(null);
    this.formulario.get('poder')?.setValue('');
    this.formulario.get('corrupcion')?.setValue(0);


    this.formulario.markAsPristine();
    this.formulario.markAsUntouched();
  }
}