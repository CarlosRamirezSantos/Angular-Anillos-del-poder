import { Component, inject, Input} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfiguracionPopup } from '../../interfaces/configuracionPopup';
import { ButtonModule } from 'primeng/button';
import { Toast, ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-confirmar-popup',
  imports: [ButtonModule,ConfirmPopupModule,ToastModule],
  templateUrl: './confirmar-popup.html',
  styleUrl: './confirmar-popup.css',
})
export class ConfirmarPopup {

@Input() config!: ConfiguracionPopup;

private confirmationService = inject(ConfirmationService);
private messageService = inject(MessageService);

    confirm2(event: Event) {
        this.confirmationService.confirm({
            target: event.currentTarget as EventTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger'
            },
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }
}