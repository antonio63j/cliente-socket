import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuariosActivosObs: Observable<any>;

  constructor(
    private chatService: ChatService,
    private wsService: WebsocketService
  ) { }

  ngOnInit(): void {
    this.usuariosActivosObs = this.chatService.escuchaMesajeUsuariosActivos();


    this.wsService.emit('mensaje-solicitud-usuarios-activos', ( resp ) => {
      console.log(resp);
    });

  }

}
