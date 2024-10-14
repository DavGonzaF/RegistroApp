// inicio.page.ts

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage  {

  public usuario: Usuario = new Usuario();

  constructor(
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) 
  {
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  

  navegarMiClase() {
    this.usuario.navegarEnviandoUsuario(this.router, '/miclase')
  }

  navegarMisDatos() {
    this.usuario.navegarEnviandoUsuario(this.router, '/misdatos')
  }

  logout() {
    this.usuario.navegarEnviandoUsuario(this.router, '/login')
  }
}
