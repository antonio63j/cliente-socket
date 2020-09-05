import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private wsService: WebsocketService
  ) { }

  public enviarMensaje(mensaje: string): void {

    const payload = {
      de: this.wsService.getUsuario().nombre,
      cuerpo: mensaje
    };
    this.wsService.emit('mensaje', payload);
  }

  public escucharMensajeBroadcast(): Observable<unknown>{
    return this.wsService.escuchar('mensaje-broadcast');
  }

  public escuchaMesajePrivado(): Observable<unknown> {
    return this.wsService.escuchar('mensaje-privado');
  }

}
