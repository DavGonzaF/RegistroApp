import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage  {

  public correo: string = '';
  private usuario: Usuario = new Usuario();

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { 
    this.usuario.recibirUsuario(activatedRoute, router);
  }

  

  public ingresarPaginaValidarRespuestaSecreta(): void {

    const usuarioEncontrado = this.usuario.listaUsuarios.find(
      usuario => usuario.correo === this.correo
    );

    if (!usuarioEncontrado) {
      this.usuario.navegarEnviandoUsuario(this.router, '/incorrecto');
    } else {
      
      this.usuario.cuenta = usuarioEncontrado.cuenta;
      this.usuario.correo = usuarioEncontrado.correo;
      this.usuario.password = usuarioEncontrado.password;
      this.usuario.preguntaSecreta = usuarioEncontrado.preguntaSecreta;
      this.usuario.respuestaSecreta = usuarioEncontrado.respuestaSecreta;
      this.usuario.nombre = usuarioEncontrado.nombre;
      this.usuario.apellido = usuarioEncontrado.apellido;
      this.usuario.nivelEducacional = usuarioEncontrado.nivelEducacional;
      this.usuario.fechaNacimiento = usuarioEncontrado.fechaNacimiento;
      this.usuario.asistencia = usuarioEncontrado.asistencia;

      this.usuario.navegarEnviandoUsuario(this.router, '/pregunta');
    }
  }
  


}
