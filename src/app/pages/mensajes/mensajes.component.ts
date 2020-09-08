import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})



export class MensajesComponent implements OnInit {

  public nombreUsuario = null;

  constructor(
    public wsSocket: WebsocketService,
    private router: Router
  ) {
    this.nombreUsuario = wsSocket.usuario.nombre;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.wsSocket.wsLogout()
      .then ( (resp) => {
        this.router.navigateByUrl('/login');
      });

  }



}
