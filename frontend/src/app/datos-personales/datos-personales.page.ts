import { Component, OnInit } from '@angular/core';
import { isNull } from 'util';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { RuviService } from '../servicios/ruvi.service';


@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {
  model: any;
  // tslint:disable-next-line: variable-name
  id_datos: number;
  ruvi: any;
  state: any;
  consulta: any = [];
  errorMessage = '';

public id: string;
public nombres: string;
public apellidos: string;
public edad: string;
public sexo: string;
public direccion: string;
public telefono: string;
public correo: string;
public discapacidad: string;
public desplazado: string;


constructor(
  private router: Router,
  private loadingController: LoadingController,
  private ruviService: RuviService) { }

 ngOnInit() {
  this.getConsulta();
  this.model = {
    nombres: null,
    apellidos: null,
    edad: null,
    sexo: null,
    direccion: null,
    telefono: null,
    correo: null,
    discapacidad: null,
    desplazado: null
  };

}
datosPer(form: NgForm) {
console.log(this.model);
 }
 Aceptar() {
  this.ruvi.vendedor = this.id_datos;
  this.ruviService.SaveLocalStorageItem(
    'ruvi',
    JSON.stringify(this.ruvi)
  );
  this.router.navigateByUrl('/ruvi/salud');
}
testRadio() {
  console.log(this.id_datos);
}

getConsulta() {
  this.ruviService.getVendedor().subscribe(response => {
    console.log(response);
  });
}

getConsultaId(id: string) {
  id = this.id;
  this.ruviService.getRuviVendedor(id).subscribe(
    estadoActual => {
      console.log(estadoActual);
      this.consulta = estadoActual;
    }, error => this.errorMessage = error);
}
  saveForm() {
  const data = {
    nombres: this.nombres,
    apellidos: this.apellidos,
    edad: this.edad,
    sexo: this.sexo,
    direccion: this.direccion,
    telefono: this.telefono,
    correo: this.correo,
    discapacidad: this.discapacidad,
    desplazado: this.desplazado
  };
  this.ruviService.setVendedor(data).subscribe(response => {
    console.log(response);
  });
}

deleteForm(id: string) {
  this.id = id;
  this.ruviService.deleteVendedor(id).subscribe(response => {
    this.ngOnInit();
    console.log(response);
  });
}

actualizarForm() {
  const data = {
    nombres: this.nombres,
    apellidos: this.apellidos,
    edad: this.edad,
    sexo: this.sexo,
    direccion: this.direccion,
    telefono: this.telefono,
    correo: this.correo,
    discapacidad: this.discapacidad,
    desplazado: this.desplazado
  };
  this.ruviService.putVendedor(data).subscribe(response => {
    console.log(response);
  });
}
}
