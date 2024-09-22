// inicio.page.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public usuario: Usuario = new Usuario('', '', '', '', '', '', '',
    NivelEducacional.findNivelEducacionalById(1)!, undefined);

  constructor(
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) 
  {
    this.activatedRoute.queryParams.subscribe(params => {
      const nav = this.router.getCurrentNavigation();
      if (nav && nav.extras.state && nav.extras.state['usuario']) {
        this.usuario = nav.extras.state['usuario'];
      } else {
        this.router.navigate(['/login']); // Redirige al login si no hay usuario
      }
    });
  }

  ngOnInit() {}

  navegarMiClase() {
    const navigationExtras = { state: { usuario: this.usuario }};
    this.router.navigate(['/miclase'], navigationExtras);
  }

  navegarMisDatos() {
    const navigationExtras = { state: { usuario: this.usuario }};
    this.router.navigate(['/misdatos'], navigationExtras);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
