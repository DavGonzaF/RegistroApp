import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario'; 

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {

  public usuario: Usuario = new Usuario();

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.usuario.recibirUsuario(activatedRoute, router);
  }

  ngOnInit() {
  }

}
