import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { RuviService } from '../servicios/ruvi.service';


@Component({
  selector: 'app-registro-documento',
  templateUrl: './registro-documento.page.html',
  styleUrls: ['./registro-documento.page.scss'],
})
export class RegistroDocumentoPage implements OnInit {
  model: any;
  // tslint:disable-next-line: variable-name
  id_registrodoc: number;
  ruvi: any;
  state: any;
  consulta: any = [];
  errorMessage = '';
public id: string;
 // tslint:disable-next-line: variable-name
public tipo_documento: string;
// tslint:disable-next-line: variable-name
public numero_documento: string;
// tslint:disable-next-line: variable-name
public registro_rivi: string;


  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private ruviService: RuviService) { }

  ngOnInit() {
    this.getConsulta();
    this.model = {
      tipo_documento: null,
      numero_documento: null,
      registro_rivi: null
    };

  }
// llamo el registro del Form del html (ngSubmit)
  registroDocu(form: NgForm) {
   console.log(this.model);
  }

  Aceptar() {
    this.ruvi.documento = this.id_registrodoc;
    this.ruviService.SaveLocalStorageItem(
      'ruvi',
      JSON.stringify(this.ruvi)
    );


    this.router.navigateByUrl('/ruvi/datos-personales');
  }

  testRadio() {
    console.log(this.id_registrodoc);
  }

  getConsulta() {
    this.ruviService.getDocumento().subscribe(response => {
    console.log(response);
    });
  }

  getConsultaId(id: string) {
    id = this.id;
    this.ruviService.getRuviDocumento(id).subscribe(
      estadoActual => {
        console.log(estadoActual);
        this.consulta = estadoActual;
      }, error => this.errorMessage = error);
  }

  saveForm() {
    const data = {
      tipo_documento: this.tipo_documento,
      numero_documento: this.numero_documento,
      registro_rivi: this.registro_rivi
    };
    this.ruviService.setDocumento(data).subscribe(response => {

      console.log(response);
    });
  }

  deleteForm(id: string) {
    this.id = id;
    this.ruviService.deleteDocumento(id).subscribe(response => {
      this.ngOnInit();
      console.log(response);
    });
  }

  actualizarForm() {
    const data = {
      id_registrodoc: this.id,
      tipo_documento: this.tipo_documento,
      numero_documento: this.numero_documento,
      registro_rivi: this.registro_rivi,
    };
    this.ruviService.putDocumento(data).subscribe(response => {
      console.log(response);
    });
  }
}
