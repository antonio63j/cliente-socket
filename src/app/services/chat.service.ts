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
      de: 'Antonio',
      cuerpo: mensaje
    };
    this.wsService.enviar('mensaje', payload);
  }

  public escucharMensaje(): Observable<unknown>{
    return this.wsService.escuchar('mensaje-broadcast');
  }

}
