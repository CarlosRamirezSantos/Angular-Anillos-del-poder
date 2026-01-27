import { Component } from '@angular/core';
import { Razas } from '../../clases/razas';
import { Raza } from '../../interfaces/raza';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-busqueda-raza',
  imports: [InputTextModule,FormsModule,ButtonModule,CommonModule,RouterLink],
  templateUrl: './busqueda-raza.html',
  styleUrl: './busqueda-raza.css',
})
export class BusquedaRaza {

  raza = new Razas()


  razasFiltradas: Raza[] = this.raza.razas;
  campoBusqueda: string = '';
  buscar() {

     const t = this.campoBusqueda.toLowerCase();

    this.razasFiltradas = this.raza.razas.filter(a =>
      a.nombre.toLowerCase().includes(t) ||
      a.descripcion.toLowerCase().includes(t) ||
      a.longevidad.toLowerCase().includes(t) ||
      a.regionPrincipal.toLowerCase().includes(t) ||
      (a.afinidadMagica ? 'tiene' : 'no tiene').includes(t) ||
      a.nivelCorrupcion.toString().includes(t)
    );

  }
}
