import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { AppComponent } from './app.component';
import { EmpleadosComponent } from './empleados/empleado.component';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { EmpleadoService } from './services/empleado.service';

@NgModule({
  declarations: [
    AppComponent,
    EmpleadosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Añade FormsModule aquí
    HttpClientModule // Añade HttpClientModule aquí
  ],
  providers: [
    EmpleadoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
