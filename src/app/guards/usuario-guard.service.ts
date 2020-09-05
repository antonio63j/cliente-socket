import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})

export class UsuarioGuardService implements CanActivate{

  constructor(
    public wsService: WebsocketService,
    public route: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let retorno = true;
    if (!this.wsService.getUsuario()) {
      this.route.navigateByUrl('/');
      retorno = false;
    }
    return retorno;
  }

}
