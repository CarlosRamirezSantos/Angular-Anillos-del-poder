import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card'; 

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './estadisticas.html',
  styleUrls: ['./estadisticas.css']
})
export class Estadisticas implements OnInit {
  stats: any = { jugadas: 0, victorias: 0, derrotas: 0 };
  porcentajeVictorias: number = 0;

  ngOnInit() {
    const statsStr = localStorage.getItem('esdla_estadisticas');
    if (statsStr) {
      this.stats = JSON.parse(statsStr);

      if (this.stats.jugadas > 0) {
        this.porcentajeVictorias = Math.round((this.stats.victorias / this.stats.jugadas) * 100);
      }
    }
  }

  getColorWinRate() {
    if (this.porcentajeVictorias >= 70) return '#22c55e'; 
    if (this.porcentajeVictorias >= 40) return '#eab308'; 
    return '#ef4444'; 
  }
}