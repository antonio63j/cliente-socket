import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  public texto = '';
  private suscripciónChat: Subscription;

  listaMensajes: any [] = [];


  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.suscripciónChat = this.chatService.escucharMensaje().subscribe (msg => {
      console.log('leido broadcast' + JSON.stringify(msg));
      this.listaMensajes.push (msg);
    }
      );
  }

  enviarMensaje(): void {
     console.log(`enviando texto:${this.texto}`);
     this.chatService.enviarMensaje(this.texto);
     this.texto = '';
  }

  ngOnDestroy(): void {
    this.suscripciónChat.unsubscribe();
  }

}
