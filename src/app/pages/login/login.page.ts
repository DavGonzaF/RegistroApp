import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  public usuario: Usuario;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(this.activatedRoute, this.router);

    this.usuario.cuenta = 'atorres';
    this.usuario.password = '1234';  

   }

  

  public ingresarPaginaValidarCorreo(): void {
    this.usuario.navegarEnviandoUsuario(this.router, '/correo')
  }

  public ingresar(): void{
    if (this.usuario) {

      if(!this.validarUsuario(this.usuario)) return;

      const usu: Usuario | undefined = this.usuario.buscarUsuarioValido(
        this.usuario.cuenta, this.usuario.password);
      
      if (usu) {
        this.mostrarMensaje('¡Bienvenido(a)!');
        this.usuario.navegarEnviandoUsuario(this.router, '/inicio')
      }
    }
  }

  public validarUsuario(usuario: Usuario): boolean {
    const mensajeError = usuario.validarUsuario();
    if (mensajeError) {
      this.mostrarMensaje(mensajeError);
      return false;
    }
    return true;
  }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion? duracion: 2000
    });
    toast.present();
  }

}
