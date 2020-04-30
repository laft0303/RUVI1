import { Component, OnInit } from '@angular/core';
import { RuviService } from '../servicios/ruvi.service';

@Component({
  selector: 'app-consulta-vendedor',
  templateUrl: './consulta-vendedor.page.html',
  styleUrls: ['./consulta-vendedor.page.scss'],
})
export class ConsultaVendedorPage implements OnInit {
  constructor(private servicios: RuviService) { }
  estado: any = [];
  errorMessage = '';
  ngOnInit() {
    this.getConsulta();
  }

  getConsulta()  {
    this.servicios.getVendedor().subscribe(f => {
      console.log(f);
      f.map((item: any) => {
        Object.assign(item, { visible: false });
        return item;
      });
      this.estado = f;
    }, error => this.errorMessage = error);
}
  }
