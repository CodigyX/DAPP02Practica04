import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleados/empleado'; // Verifica la ruta de importación
import { EmpleadoService } from '../services/empleado.service'; // Verifica la ruta de importación

@Component({
  selector: 'app-empleados',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadosComponent implements OnInit {
  constructor(
    private empleadoService: EmpleadoService) {
    // setInterval(() => {
    //   this.printRows();
    // }, 6000);
  }
  ngOnInit(): void {
    const con = this.empleadoService.getPersonas()
    con.subscribe((data: Empleado[]) => {
      this.rows = data
    }, error => {
      console.error(error);
      // Maneja el error de alguna manera
    })
  }
  printRows() {
    console.log(this.rows);
  }

  backupRowData: null | Empleado = null
  cancel(row: Empleado) {
    console.log(this.rows.indexOf(row) == this.rows.length - 1)
    if (this.rows.indexOf(row) == this.rows.length - 1) {
      this.rows.pop()
    } else {
      if (this.backupRowData) {
        Object.assign(row, this.backupRowData);
        this.backupRowData = null; // limpiar la copia de seguridad
      }
      row.isEditing = false; // deshabilitar la edición
    }

  }

  rows: Empleado[] = [];

  addNewRow(): void {

    this.rows.push({ id: '', nombre: '', direccion: '', telefono: '', isEditing: true });
  }

  addRow(row: Empleado): void {
    const { id, isEditing, ...data } = row
    if (row.nombre && row.direccion && row.telefono) {
      console.log("--->", row.id, row.id === "")
      if (row.id === "") {
        const con = this.empleadoService.postPersona({
          ...data
        })
        con.subscribe((data: Empleado) => {
          this.rows.pop()
          this.rows.push(data)
        }, error => {
          console.error(error);
          // Maneja el error de alguna manera
        })
      } else {
        this.empleadoService.putPersonas({
          id: id,
          ...data
        }).subscribe()
      }
      row.isEditing = false;
    }
  }
  startEdit(row: Empleado) {
    this.backupRowData = { ...row };
    row.isEditing = true; // habilitar la edición
  }

  deleteRow(index: number): void {
    const pos = this.rows.splice(index, 1);
    this.empleadoService.deletePersonas(pos[0].id).subscribe((data: any) => {
    }, error => {
      console.error(error);
      // Maneja el error de alguna manera
    }
  )}
}