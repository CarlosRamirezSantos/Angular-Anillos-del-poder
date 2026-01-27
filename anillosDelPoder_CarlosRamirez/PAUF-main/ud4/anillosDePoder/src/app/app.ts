import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { environment } from '../environments/environment.development';
import { PaisesService } from './servicios/paises-service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ButtonModule,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('anillosDePoder');

  constructor(private paisesService: PaisesService) {};

  paises: any [] = [];

  error = '';

  ngOnInit(): void {
    this.cargarPaises();
}

  cargarPaises(): void {
    this.paisesService.getAllCountries().subscribe({
      next: (data) => {
        this.paises = data;
        console.log(this.paises);
      },
      error: (err) => {
        this.error = err;
        console.error('Error al cargar los países:', err);
      }
    });
  }
}