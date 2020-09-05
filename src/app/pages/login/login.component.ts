import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre = '';

  constructor(
    private wsService: WebsocketService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ingresar(): void {
    this.wsService.wsLogin(this.nombre)
      .then ( (resp) => {
         this.router.navigateByUrl('/mensajes');
         console.log(`usuario ${this.nombre} registrado, respuesta: ${JSON.stringify(resp)}`)
      }
    );

  }

}
