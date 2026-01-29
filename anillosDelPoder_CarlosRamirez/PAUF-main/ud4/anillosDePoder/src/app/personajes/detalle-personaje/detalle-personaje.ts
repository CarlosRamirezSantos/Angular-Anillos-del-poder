import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PersonajesService } from '../../servicios/personajes-service';

// Módulos de PrimeNG (Usando los que tú usas)
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select'; // Para el desplegable de Raza
import { DatePickerModule } from 'primeng/datepicker'; // Para la fecha
import { InputNumberModule } from 'primeng/inputnumber'; // Para la corrupción

@Component({
  selector: 'app-detalle-personaje',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    DatePickerModule,
    InputNumberModule
  ],
  templateUrl: './detalle-personaje.html',
  styleUrl: './detalle-personaje.css'
})
export class DetallePersonaje implements OnInit {

  esEdicion: boolean = false;
  idPersonaje: number | null = null;

  // Lista de razas para el desplegable
  razas = ['HUMANO', 'ELFO', 'ENANO', 'HOBBIT', 'MAIAR', 'OSCURO'];

  // TU ESTILO: Definimos el formulario directamente aquí
  formulario: FormGroup = new FormGroup({
    nombre: new FormControl('', [
      Validators.required, 
      Validators.minLength(3)
    ]),
    raza: new FormControl(null, [
      Validators.required
    ]),
    fechaNacimiento: new FormControl(null, [
      Validators.required
    ]),
    nivelCorrupcion: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(100)
    ])
  });

  constructor(
    private personajeService: PersonajesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Comprobamos si venimos a editar (si hay ID en la URL)
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.esEdicion = true;
      this.idPersonaje = Number(id);
      this.cargarPersonaje(this.idPersonaje);
    }
  }

cargarPersonaje(id: number) {
    this.personajeService.getPersonaje(id).subscribe({
      next: (datos) => {
        if(datos.fechaNacimiento) {
            datos.fechaNacimiento = new Date(datos.fechaNacimiento);
        }
        this.formulario.patchValue(datos);
      },
      error: (e) => console.error("Error al cargar", e)
    });
  }
  enviar() {
    if (this.formulario.valid) {
      const datosGuardar = this.formulario.value;

      if (this.esEdicion && this.idPersonaje) {
        this.personajeService.actualizarPersonaje(this.idPersonaje, datosGuardar).subscribe({
            next: () => {
                alert("Personaje actualizado correctamente");
                this.router.navigate(['/personajes']);
            },
            error: (e) => alert("Error al actualizar")
        });
      } else {

        this.personajeService.insertarPersonaje(datosGuardar).subscribe({
            next: () => {
                alert("Personaje creado correctamente");
                this.router.navigate(['/personajes']);
            },
            error: (e) => alert("Error al crear")
        });
      }

    } else {
      alert("El formulario no es válido, revisa los campos en rojo");
      this.formulario.markAllAsTouched();
    }
  }

  limpiar() {
    this.formulario.reset({
        nivelCorrupcion: 0 
    });
  }
}