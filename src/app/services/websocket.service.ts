import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor(
    private socket: Socket
  ) {
    this.checkStatus();
  }

  private checkStatus(): void {
    this.socket.on('connect', () => {
      console.log('servidor conectado');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('servidor desconectado');
      this.socketStatus = false;
    });
  }

  // tambien public enviar(evento: string, payload?: any, callback?: Function): void{
  public enviar(evento: string, payload?: any, callback?: () => void): void{
    this.socket.emit (evento, payload, callback);
  }

  public escuchar(evento: string): Observable<unknown>{
    return this.socket.fromEvent(evento);
  }

}
