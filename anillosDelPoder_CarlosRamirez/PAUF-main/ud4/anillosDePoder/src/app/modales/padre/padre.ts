import { Component } from '@angular/core';
import { header } from '@primeuix/themes/aura/accordion';

import { ConfirmarPopup } from '../confirmar-popup/confirmar-popup';
import { ConfiguracionPopup } from '../../interfaces/configuracionPopup';
import { Button, ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-padre',
  imports: [ConfirmarPopup,ButtonModule,ToastModule],
  templateUrl: './padre.html',
  styleUrl: './padre.css',
})
export class Padre {

parametrosModal: ConfiguracionPopup = {
  message: "¿Estás seguro de que deseas eliminar este registro?",
  header: "Confirmar eliminación"
}
}