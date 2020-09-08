import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Usuario } from '../classes/usuario';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public usuario: Usuario = null;

  constructor(
    private socket: Socket,
    private router: Router
  ) {
    this.cargarStorage();
    this.checkStatus();
  }

  private checkStatus(): void {
    this.socket.on('connect', () => {
      console.log('servidor conectado');
      this.socketStatus = true;
      // afl
      this.cargarStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('servidor desconectado');
      this.socketStatus = false;
    });
  }

  // tslint:disable-next-line: ban-types
  public emit(evento: string, payload?: any, callback?: Function): void{
  // emit(evento: string, payload?: any, callback?: () => void): void{
    this.socket.emit (evento, payload, callback);
  }


  // tslint:disable-next-line: typedef
  public wsLogin(nombre: string) {
    // vamos a hacer que el emit se sincrono de form que cuando se salga de
    // wsLogin, tendremos la certeza de que se ha gestionado el Login en el servidor

    console.log(' en wsLogin');
    return new Promise ((resolve, reject) => {
      this.emit('configurar-usuario', {nombre}, ( resp ) => {
        this.usuario = new Usuario(nombre);
        this.guardarStorage();
        resolve (resp);
      });
      console.log('fin emit login');
    });
  }

  // tslint:disable-next-line: typedef
  public wsLogout() {
    this.usuario.nombre = '';
    localStorage.removeItem('usuario');

    const payload = {nombre: 'sin-nombre'};

    return new Promise ((resolve, reject) => {
      this.emit('configurar-usuario', payload, ( resp ) => {
        console.log( resp);
        resolve (resp);
      });
      console.log('fin emit logout');
    });
  }

  public escuchar(evento: string): Observable<unknown>{
    return this.socket.fromEvent(evento);
  }

  public getUsuario(): Usuario {
    return this.usuario;
  }

  guardarStorage(): void {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  cargarStorage(): void{
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.wsLogin(this.usuario.nombre)
      .then ( (resp) => {
         this.router.navigateByUrl('/mensajes');
         console.log(`usuario ${this.usuario.nombre} registrado, respuesta: ${JSON.stringify(resp)}`)
      }
    );
    }
  }

}
