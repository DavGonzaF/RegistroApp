import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
})
export class MisdatosPage implements AfterViewInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  public usuario: Usuario = new Usuario();
  public listaNivelesEducacionales= NivelEducacional.getNivelesEducacionales();
  

  constructor(
    private AlertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private animationController: AnimationController,
    private router: Router
  ) { 
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  ngAfterViewInit() {
    this.animarTituloIzqDer();
  }

  animarTituloIzqDer() {
    this.animationController
      .create()
      .addElement(this.itemTitulo.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .fromTo('transform', 'translate(-50%)', 'translate(100%)')
      .play();
  }
  actualizarUsuario() {
    this.usuario.actualizarUsuario();
    this.usuario.navegarEnviandoUsuario(this.router, '/login');
  }

}

