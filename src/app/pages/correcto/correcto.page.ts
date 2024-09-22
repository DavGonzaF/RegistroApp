import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario'; 

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {

  public usuario!: Usuario;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      const nav = this.router.getCurrentNavigation();
      if (nav && nav.extras.state && nav.extras.state['usuario']) {
        this.usuario = nav.extras.state['usuario'];
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
  }

}
