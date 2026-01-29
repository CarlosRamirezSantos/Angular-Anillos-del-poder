import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PersonajesService } from '../../servicios/personajes-service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-buscar-personaje',
  imports: [ButtonModule, TableModule, CommonModule],
  templateUrl: './buscar-personaje.html',
  styleUrl: './buscar-personaje.css',
})
export class BuscarPersonaje implements OnInit {

  personajes: any [] = [];
  error = ''

  constructor(private personajeService: PersonajesService,private cdr: ChangeDetectorRef, private route: Router
  ){
    
  }

  editar(id:number){
    
    this.route.navigate(["/editar",id])
  }

  crearPersonaje() {
    this.route.navigate(['/crearPersonaje']);
  }
  ngOnInit(): void {
    this.cargarPersonajes();
    

  }

  cargarPersonajes () {
    this.personajeService.getAllPersonajes().subscribe({
      next: data => {
        console.log(data)
        this.personajes = data
        this.cdr.detectChanges()
      }, error: err => {
        this.error = 'Se ha producido un error'
      }
    })
  }
}