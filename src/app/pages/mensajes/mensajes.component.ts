import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})



export class MensajesComponent implements OnInit {

  public nombreUsuario = null;

  constructor(
    public wsSocket: WebsocketService
  ) {
    this.nombreUsuario = wsSocket.usuario.nombre;
  }

  ngOnInit(): void {
  }

}
