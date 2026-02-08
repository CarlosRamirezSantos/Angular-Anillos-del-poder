import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PersonajesService } from '../../servicios/personajes-service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip'; 
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-buscar-personaje',
  standalone: true,
  imports: [
    ButtonModule, 
    TableModule, 
    CommonModule, 
    ToastModule, 
    ConfirmDialogModule,
    TooltipModule
  ],
  templateUrl: './buscar-personaje.html',
  styleUrl: './buscar-personaje.css',
  providers: [ConfirmationService, MessageService]
})
export class BuscarPersonaje implements OnInit {

  personajes: any [] = [];
  error = ''

  constructor(
    private personajeService: PersonajesService,
    private cdr: ChangeDetectorRef, 
    private route: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.cargarPersonajes();
  }

  crearPersonaje() {
    this.route.navigate(['/crearPersonaje']);
  }

  editar(id:number){
    this.route.navigate(["/editar",id])
  }

  cargarPersonajes () {
    this.personajeService.getAllPersonajes().subscribe({
      next: data => {
        this.personajes = data
        this.cdr.detectChanges()
      }, error: err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los personajes.' });
      }
    })
  }

  confirmarAccionLogica(event: Event, item: any) {
    const estaDeBaja = item.fechaBaja != null;

    const mensaje = estaDeBaja 
      ? '¿Deseas reactivar el personaje?' 
      : 'Se va a dar de baja el personaje ¿Estás seguro?';
    
    const header = estaDeBaja ? 'Reactivar Personaje' : 'Baja Lógica';
    const icono = estaDeBaja ? 'pi pi-refresh' : 'pi pi-info-circle';

    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: mensaje,
        header: header,
        icon: icono,
        acceptLabel: 'Aceptar',
        rejectLabel: 'Cancelar',
        accept: () => {
            if (estaDeBaja) {

                this.personajeService.reactivarPersonaje(item.id).subscribe({
                    next: (personajeActualizado) => {
                        this.messageService.add({ severity: 'success', summary: 'Reactivado', detail: 'Personaje reactivado correctamente.' });
                        
                        item.fechaBaja = personajeActualizado.fechaBaja; 
                        
                        this.cdr.detectChanges();
                    },
                    error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo reactivar.' })
                });
            } else {
                this.personajeService.bajaLogicaPersonaje(item.id).subscribe({
                    next: (personajeActualizado) => {
                        this.messageService.add({ severity: 'success', summary: 'Baja Lógica', detail: 'Se ha dado de baja correctamente.' });
                    
                        item.fechaBaja = personajeActualizado.fechaBaja;
                        
                        this.cdr.detectChanges();
                    },
                    error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo dar de baja.' })
                });
            }
        }
    });
  }

  confirmarBajaFisica(event: Event, id: number) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Se va a borrar de forma definitiva el registro ¿Estás seguro que deseas borrarlo?',
        header: 'Confirmación de Borrado',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Aceptar',
        rejectLabel: 'Cancelar',
        acceptButtonStyleClass: 'p-button-danger', 
        accept: () => {
            this.personajeService.bajaFisica(id).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: 'Borrado', detail: 'Personaje eliminado físicamente.' });
                    this.cargarPersonajes();
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se puede borrar ese personaje (posible portador).' });
                }
            });
        }
    });
  }
}