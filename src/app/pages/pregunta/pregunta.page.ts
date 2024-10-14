import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage  {

  public usuario: Usuario;
  public respuesta: string = '';

  constructor(
    private animationController: AnimationController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
  ) { 
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  

  public ValidarRespuestaSecreta(): void {
    debugger
    if (this.usuario.respuestaSecreta === this.respuesta) {
      this.usuario.navegarEnviandoUsuario(this.router, '/correcto');
    } else {
      this.usuario.navegarEnviandoUsuario(this.router, '/incorrecto');
    }
  }
  

}


