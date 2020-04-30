import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { RuviService } from '../servicios/ruvi.service';

@Component({
  selector: 'app-sitio-labor',
  templateUrl: './sitio-labor.page.html',
  styleUrls: ['./sitio-labor.page.scss'],
})
export class SitioLaborPage implements OnInit {

  model: any = {};
  // tslint:disable-next-line: variable-name
  id_sitioinf: number;
  ruvi: any;
  state: any;
  consulta: any = [];
  errorMessage = '';

  public id: string;
  public direccion: string;
  public producto: string;
  public  tiempoInformal: string;
 constructor(
   private router: Router,
   private loadingController: LoadingController,
   private ruviService: RuviService
  ) {}

  ngOnInit() {
    this.getConsulta();
    this.model = {
      direccion: null,
      producto: null,
      tiempoInformal: null,
     };
  }
  Aceptar() {
    this.ruvi.sitio_labor = this.id_sitioinf;
    this.ruviService.SaveLocalStorageItem(
      'ruvi',
      JSON.stringify(this.ruvi)
    );

    this.router.navigateByUrl('/ruvi/menu');
  }

  testRadio() {
    console.log(this.id_sitioinf);
  }

  getConsulta() {
    this.ruviService.getSitio().subscribe(response => {
      console.log(response);
    });
  }

  getConsultaId(id: string) {
    id = this.id;
    this.ruviService.getRuviSitio(id).subscribe(
      estadoActual => {
        console.log(estadoActual);
        this.consulta = estadoActual;
      }, error => this.errorMessage = error);
  }
  saveForm() {
    const data = {
      direccion: this.direccion,
      producto: this.producto,
      tiempoInformal: this.tiempoInformal,
    };
    this.ruviService.setSitio(data).subscribe(response => {
      console.log(response);
    });
  }
  deleteForm(id: string) {
    this.id = id;
    this.ruviService.deleteSitio(id).subscribe(response => {
      this.ngOnInit();
      console.log(response);
    });
  }
  actualizarForm() {
    const data = {
      direccion: this.direccion,
      producto: this.producto,
      tiempoInformal: this.tiempoInformal,
    };
    this.ruviService.putSitio(data).subscribe(response => {
      console.log(response);
    });
  }
}
