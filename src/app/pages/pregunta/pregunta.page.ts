import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  public usuario: Usuario;
  public respuesta: string = '';

  constructor(
    private animationController: AnimationController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
  ) { 
    this.usuario = new Usuario('', '', '', '', '', '', '',
      NivelEducacional.findNivelEducacionalById(1)!, undefined);
    this.activatedRoute.queryParams.subscribe(params => {
      const nav = this.router.getCurrentNavigation();
      if (nav) {
        if ( nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
          return
        }
      }
      this.router.navigate(['/login'])
    })
  }

  ngOnInit() {
  }

  public ValidarRespuestaSecreta(): void {
    if (this.usuario.respuestaSecreta === this.respuesta) {
      const navigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuario
        }
      };
      this.router.navigate(['/correcto'], navigationExtras); 
    } else {
      this.router.navigate(['/incorrecto']); 
    }
  }
  

}


