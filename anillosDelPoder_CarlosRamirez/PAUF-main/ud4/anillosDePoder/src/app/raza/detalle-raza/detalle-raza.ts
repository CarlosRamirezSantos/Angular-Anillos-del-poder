import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-detalle-raza',
  imports: [ReactiveFormsModule, SelectModule,InputTextModule,TextareaModule,SelectButtonModule,ButtonModule,RouterLink],
  templateUrl: './detalle-raza.html',
  styleUrl: './detalle-raza.css',
})
export class DetalleRaza {

  regiones = ['Mordor','Rivendel','La Comarca']
  afinidades = ['Tiene', 'No tiene']



 formulario: FormGroup = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    longevidad: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    nivelCorrupcion: new FormControl(0, [
      Validators.required,
      
    ]),
    regionPrincipal: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    afinidadMagica: new FormControl('', [
      Validators.required
    ])
  
  })

   enviar() {
    if (this.formulario.valid) {
      alert("Raza enviada correctamente");
      this.limpiar();
    } else {
      alert("El formulario no es válido, revisa los campos en rojo");
    }
  }
  // No me funciona haciendolo asi como lo hicisteis en clase. He optado por como dijo Victor en clase. ASí si me funciona.
  
  /*limpiar(){
    this.formulario.value.nombre.setValue('');
    this.formulario.value.descripcion.setValue('');
    this.formulario.value.longevidad.setValue('');
    this.formulario.value.nivelCorrupcion.setValue(0);
    this.formulario.value.regionPrincipal.setValue('');
    this.formulario.value.afinidadMagica.setValue('');
  }*/ 

  limpiar(){
    this.formulario.get('nombre')?.setValue('');
    this.formulario.get('descripcion')?.setValue('');
    this.formulario.get('longevidad')?.setValue('');
    this.formulario.get('nivelCorrupcion')?.setValue(0);
    this.formulario.get('regionPrincipal')?.setValue(null);
    this.formulario.get('afinidadMagica')?.setValue(null);

    this.formulario.markAsPristine();
    this.formulario.markAsUntouched();
}
}