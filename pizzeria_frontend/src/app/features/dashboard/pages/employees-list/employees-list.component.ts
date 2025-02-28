import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../../material-module';
import { EmployeeInterface } from '../../../../core/models/employee-interface';
import { EmployeeService } from '../../../../core/services/employee.service';
import { response } from 'express';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees-list',
  imports: [RouterOutlet, CommonModule, MaterialModule, FormsModule],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css'
})
export class EmployeesListComponent implements OnInit {

  successMessage = "";
  errorMessage = "";
  banderin = false;
  
  employeeData = {
    full_name: '',
    email: '',
    password: ''
  }

  employeeItems : EmployeeInterface[] =[];

  //constructor de la clase
  constructor(private employeService : EmployeeService){

  }

  ngOnInit(): void {
    this.getEmployeeTable();
  }

  private getEmployeeTable ():void{
    this.employeService.getEmployees().subscribe({
      next: (response: any) =>{
        if (response.success) {
          this.employeeItems = response.data;
          this.successMessage = response.message;
          this.errorMessage = ''; // Limpiamos posibles errores previos
        }else{
          this.handleError(response.error);
        }
      },
      error: () => this.handleError('Error al crear el empleado.'),

    })
  }

  //crear empleado
  employeeAdd(): void {
    if(!this.employeeData.full_name || !this.employeeData.email || !this.employeeData.password){
      this.errorMessage = 'Todos los campos son requeridos';
      return;
    }

    this.employeService.createEmployee(this.employeeData).subscribe({
      next: (response) => {
        if (response.success) {
          this.banderin = true
          this.successMessage = response.message;
          this.errorMessage = '';
          this.clearForm();
        } else {
          this.handleError(response.error);
        }
      },
      error: () => this.handleError('Error al crear el menu.'),
    })
  } 

   //FUNCIONES DE APOYO
   private handleError(message: string): void {
    this.errorMessage = message;
    this.successMessage = '';
  }

  clearForm() {
    this.employeeData = {
      full_name: '',
      email: '',
      password: ''
    }
    // this.getEmployeeTable();
    window.location.reload();
  }
}
