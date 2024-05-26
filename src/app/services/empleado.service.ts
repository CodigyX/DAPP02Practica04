import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Empleado } from '../empleados/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:8080/api/empleado';
  constructor() { }

  // Método para realizar una solicitud GET con Axios
  getPersonas(): Observable<any> {
    let urlgetpersonas = "/"
    return new Observable(observer => {
      axios.get(`${this.apiUrl}${urlgetpersonas}`, {
        auth: {
          password: "admin",
          username: "admin"
        }
      })
        .then((response: AxiosResponse) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  // Método para realizar una solicitud POST con Axios
  postPersona(data: any): Observable<Empleado> {

    return new Observable(observer => {
      axios.post(`${this.apiUrl}`, data, {
        auth: {
          password: "admin",
          username: "admin"
        }
      })
        .then((response: AxiosResponse) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
          console.log(error)
        });
    });
  }

  // Método para realizar una solicitud PUT con Axios
  putPersonas(data: any): Observable<any> {

    let url = "/" + data.id
    console.log(`${this.apiUrl}${url}`)

    return new Observable(observer => {
      axios.put(`${this.apiUrl}${url}`, data, {

      auth: {
        password: "admin",
        username: "admin"
      }
    })
        .then((response: AxiosResponse) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  // Método para realizar una solicitud DELETE con Axios
  deletePersonas(id_persona: string): Observable<any> {
    let url = "/" + id_persona
    console.log(`${this.apiUrl}${url}`)
    return new Observable(observer => {
      axios.delete(`${this.apiUrl}${url}`, {
      auth: {
        password: "admin",
        username: "admin"
      }
    })
        .then((response: AxiosResponse) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}