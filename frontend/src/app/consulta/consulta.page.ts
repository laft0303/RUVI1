import { Component, OnInit } from '@angular/core';
import { RuviService } from '../servicios/ruvi.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {

  constructor(private servicios: RuviService) { }
  estadoActual: any = [];
  errorMessage = '';
  ngOnInit() {
    this.getConsulta();
  }

  getConsulta()  {
    this.servicios.getRegistroUsuario().subscribe(estadoActual => {
      console.log(estadoActual);
      estadoActual.map((item: any) => {
        Object.assign(item, { visible: false });
        return item;
      });
      this.estadoActual = estadoActual;
    }, error => this.errorMessage = error);
}
  }


