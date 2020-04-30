import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { RuviService } from '../servicios/ruvi.service';


@Component({
  selector: 'app-salud',
  templateUrl: './salud.page.html',
  styleUrls: ['./salud.page.scss'],
})
export class SaludPage implements OnInit {
  model: any;
  // tslint:disable-next-line: variable-name
  id_saludper: number;
  ruvi: any;
  state: any;
  consulta: any = [];
  errorMessage = '';

  public id: string;
  // tslint:disable-next-line: variable-name
  public nombre_eps: string;
  // tslint:disable-next-line: variable-name
  public regimen_afiliacion: string;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private ruviService: RuviService
  ) { }

  ngOnInit() {
    this.getConsulta();
    this.model = {
      nombre_eps: null,
      regimen_afiliacion: null

    };
  }
  Aceptar() {
    this.ruvi.salud = this.id_saludper;
    this.ruviService.SaveLocalStorageItem(
      'ruvi',
      JSON.stringify(this.ruvi)
    );

    this.router.navigateByUrl('/ruvi/sitio-labor');
  }

  testRadio() {
    console.log(this.id_saludper);
  }

  getConsulta() {
    this.ruviService.getEps().subscribe(response => {
      console.log(response);
    });
  }

  getConsultaId(id: string) {
    id = this.id;
    this.ruviService.getRuviEps(id).subscribe(
      estadoActual => {
        console.log(estadoActual);
        this.consulta = estadoActual;
      }, error => this.errorMessage = error);
  }
  saveForm() {
    const data = {
      nombre_eps: this.nombre_eps,
      regimen_afiliacion: this.regimen_afiliacion
    };
    this.ruviService.setEps(data).subscribe(response => {
      console.log(response);
    });
  }
  deleteForm(id: string) {
    this.id = id;
    this.ruviService.deleteEps(id).subscribe(response => {
      this.ngOnInit();
      console.log(response);
    });
  }
  actualizarForm() {
    const data = {
      id_saludper: this.id,
      nombre_eps: this.nombre_eps,
      regimen_afiliacion: this.regimen_afiliacion
    };
    this.ruviService.putEps(data).subscribe(response => {
      console.log(response);
    });
  }
}

