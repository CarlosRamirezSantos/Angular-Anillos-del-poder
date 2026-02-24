import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { JuegoService } from '../servicios/juego.service';

@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './juego.html',
  styleUrls: ['./juego.css']
})
export class Juego implements OnInit {
  preguntaActual: any = null;
  aciertos: number = 0;
  idPartidaActual: number = 0;
  preguntasRespondidas: number[] = []; 
  juegoTerminado: boolean = false;
  mensajeFinal: string = '';
  
  feedbackMensaje: string = '';
  mostrarFeedback: boolean = false;
  esCorrecto: boolean = false;
  botonesBloqueados: boolean = false;

  totalPreguntasBD = 10; 

  constructor(
    private juegoService: JuegoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
  }

  iniciarNuevaPartida() {

    this.juegoTerminado = false;
    this.preguntaActual = null;
    this.aciertos = 0;
    this.preguntasRespondidas = [];
    this.botonesBloqueados = true; 

    this.juegoService.empezarPartida().subscribe({
      next: (partida) => {
        this.idPartidaActual = partida.id; 
        this.cargarSiguientePregunta();
      },
      error: (err) => console.error("Error al iniciar partida", err)
    });
  }

  cargarSiguientePregunta() {
    this.mostrarFeedback = false;
    this.botonesBloqueados = false;
    
    let idRandom;
    do {
      idRandom = Math.floor(Math.random() * this.totalPreguntasBD) + 1;
    } while (this.preguntasRespondidas.includes(idRandom));

    this.preguntasRespondidas.push(idRandom);

    this.juegoService.obtenerPregunta(idRandom).subscribe({
      next: (pregunta) => {
        this.preguntaActual = pregunta;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error al obtener pregunta", err);
        this.cargarSiguientePregunta();
      }
    });
  }

  responder(numeroRespuesta: number) {
    if (this.botonesBloqueados) return;
    this.botonesBloqueados = true;

    this.juegoService.comprobarRespuesta(this.preguntaActual.id, numeroRespuesta).subscribe(esCorrecta => {
      this.esCorrecto = esCorrecta;
      this.mostrarFeedback = true;
      this.feedbackMensaje = esCorrecta ? '¡CORRECTO! ⚔️' : '¡INCORRECTO! 🔥';
      this.cdr.detectChanges();

      setTimeout(() => {
        if (esCorrecta) {
          this.aciertos++;
          this.juegoService.sumarAcierto(this.idPartidaActual).subscribe();

          if (this.aciertos === 5) {
            this.terminarJuego(true);
          } else {
            this.cargarSiguientePregunta();
          }
        } else {
          this.terminarJuego(false);
        }
      }, 1500);
    });
  }

  terminarJuego(victoria: boolean) {
    this.juegoTerminado = true;
    this.preguntaActual = null;
    this.mostrarFeedback = false;
    this.mensajeFinal = victoria ? '¡HAS GANADO! Has salvado la Tierra Media.' : '¡HAS CAÍDO EN LA OSCURIDAD! Partida finalizada.';
    
    this.juegoService.finalizarPartida(this.idPartidaActual).subscribe();
    this.guardarEstadistica(victoria);
    this.cdr.detectChanges();
  }

  guardarEstadistica(victoria: boolean) {
    let statsStr = localStorage.getItem('esdla_estadisticas');
    let stats = statsStr ? JSON.parse(statsStr) : { jugadas: 0, victorias: 0, derrotas: 0 };
    stats.jugadas++;
    if (victoria) stats.victorias++;
    else stats.derrotas++;
    localStorage.setItem('esdla_estadisticas', JSON.stringify(stats));
  }
}