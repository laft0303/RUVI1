import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ThrowStmt } from '@angular/compiler';



@Injectable({
  providedIn: 'root'
})
export class RuviService {
  SaveLocalStorageItem(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
// tslint:disable-next-line: member-ordering
  data: any;
  // tslint:disable-next-line: member-ordering
  environment = { url : 'http://localhost:3000/ruvi'};
  // tslint:disable-next-line: member-ordering
  urlVendedor = `${environment.url}/vendedor`;
// tslint:disable-next-line: member-ordering
  urlRegistros = `${environment.url}/registros`;
  // tslint:disable-next-line: member-ordering
  urlRol = `${environment.url}/rol`;
// tslint:disable-next-line: member-ordering
  urlDocumento = `${environment.url}/documento`;
  // tslint:disable-next-line: member-ordering
  urlEps = `${environment.url}/eps`;
  // tslint:disable-next-line: member-ordering
  urlRegistroUsuario = `${environment.url}/registro-usuario`;
  // tslint:disable-next-line: member-ordering
  urlSitio = `${environment.url}/sitio`;
  // tslint:disable-next-line: member-ordering
  urllogin =  `${environment.url}/login`;



  constructor(public http: HttpClient) { }

  public obtenerData(formulario: any) {
    this.data = formulario;
    console.log(this.data);
  }

  public enviarData() {
    return this.data;
  }

 

  getLogin(usuario, contrasena): Observable<any[]> {
    return this.http.get<any[]>(this.urllogin + '/' + usuario + '/' + contrasena).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }


  getPeople(): Observable<any[]> {
    return this.http.get<any[]>(this.urlVendedor).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
   // usuario

   getVendedor(): Observable<any[]> {
      return this.http.get<any[]>(this.urlVendedor).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  setVendedor(data: any) {
    return this.http.post(this.urlVendedor, data);
  }

  getRuviVendedor(id: string) {
     return this.http.get(`${this.urlVendedor}/${id}`);
   }

  putVendedor(data: any) {
    console.log(data);
    return this.http.put(this.urlVendedor, data);
  }

  deleteVendedor(id: string) {
    console.log(`${this.urlVendedor}/${id}`);
    return this.http.delete(`${this.urlVendedor}/${id}`);
  }
          // Guardar Registro
  getRegistros(): Observable<any[]> {

    return this.http.get<any[]>(this.urlRegistros).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  setRegistros(data: any) {
    return this.http.post(this.urlRegistros, data);
  }

  getRuviRegistros(id: string) {
    return this.http.get(`${this.urlRegistros}/${id}`);
  }

  putRegistros(data: any) {
    console.log(data);
    return this.http.put(this.urlRegistros, data);
  }

  deleteRegistros(id: string) {
    console.log(`${this.urlRegistros}/${id}`);
    return this.http.delete(`${this.urlRegistros}/${id}`);
  }

     // Roles
getRol(): Observable<any[]> {

  return this.http.get<any[]>(this.urlRol).pipe(
    tap(data => console.log(JSON.stringify(data))),
    catchError(this.handleError)
  );
}

setRol(data: any) {
  return this.http.post(this.urlRol, data);
}

getRuviRol(id: string) {
   return this.http.get(`${this.urlRol}/${id}`);
}

putRol(data: any) {
  console.log(data);
  return this.http.put(this.urlRol, data);
}

deleteRol(id: string) {
  console.log(`${this.urlRol}/${id}`);
  return this.http.delete(`${this.urlRol}/${id}`);
}

// Registro Documento
getDocumento(): Observable<any[]> {

  return this.http.get<any[]>(this.urlDocumento).pipe(
    tap(data => console.log(JSON.stringify(data))),
    catchError(this.handleError)
  );
}

setDocumento(data: any) {
  return this.http.post(this.urlDocumento, data);
}

getRuviDocumento(id: string) {
   return this.http.get(`${this.urlDocumento}/${id}`);
}

putDocumento(data: any) {
  console.log(data);
  return this.http.put(this.urlDocumento, data);
}

deleteDocumento(id: string) {
  console.log(`${this.urlDocumento}/${id}`);
  return this.http.delete(`${this.urlDocumento}/${id}`);
}

// Salud
getEps(): Observable<any[]> {

  return this.http.get<any[]>(this.urlEps).pipe(
    tap(data => console.log(JSON.stringify(data))),
    catchError(this.handleError)
  );
}

setEps(data: any) {
  return this.http.post(this.urlEps, data);
}

getRuviEps(id: string) {
  return this.http.get(`${this.urlEps}/${id}`);
}

putEps(data: any) {
  console.log(data);
  return this.http.put(this.urlEps, data);
}

deleteEps(id: string) {
  console.log(`${this.urlEps}/${id}`);
  return this.http.delete(`${this.urlEps}/${id}`);
}



//  Registro Usuario
getRegistroUsuario(): Observable<any[]> {

  return this.http.get<any[]>(this.urlRegistroUsuario).pipe(
    tap(data => console.log(JSON.stringify(data))),
    catchError(this.handleError)
  );
}

setRegistroUsuario(data: any) {
  return this.http.post(this.urlRegistroUsuario, data);
}

getRuviRegistroUsuario(id: string) {
  return this.http.get(`${this.urlRegistroUsuario}/${id}`);
}

putRegistroUsuario(data: any) {
  console.log(data);
  return this.http.put(this.urlRegistroUsuario, data);
}

deleteRegistroUsuario(id: string) {
  console.log(`${this.urlRegistroUsuario}/${id}`);
  return this.http.delete(`${this.urlRegistroUsuario}/${id}`);
}

//  Sitio  //

getSitio(): Observable<any[]> {

  return this.http.get<any[]>(this.urlSitio).pipe(
    tap(data => console.log(JSON.stringify(data))),
    catchError(this.handleError)
  );
}

setSitio(data: any) {
  return this.http.post(this.urlSitio, data);
}

getRuviSitio(id: string) {
  return this.http.get(`${this.urlSitio}/${id}`);
}

putSitio(data: any) {
  console.log(data);
  return this.http.put(this.urlSitio, data);
}

deleteSitio(id: string) {
  console.log(`${this.urlSitio}/${id}`);
  return this.http.delete(`${this.urlSitio}/${id}`);
}



private handleError(err: HttpErrorResponse) {
  let errorMessage = '';
  if (err.error instanceof ErrorEvent) {
    errorMessage = `An error ocurred ${err.error.message}`;
  } else {
    errorMessage = `Server returned code: ${err.status}, error message is:   ${err.message}`;
    // tslint:disable-next-line:align
  } console.log(errorMessage);
  return throwError(errorMessage);
}

}

