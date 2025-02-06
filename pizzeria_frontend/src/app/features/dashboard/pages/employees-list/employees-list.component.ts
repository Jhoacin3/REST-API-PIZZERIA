import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../../material-module';
import { EmployeeInterface } from '../../../../core/models/employee-interface';
import { EmployeeService } from '../../../../core/services/employee.service';
import { response } from 'express';

@Component({
  selector: 'app-employees-list',
  imports: [RouterOutlet, CommonModule, MaterialModule],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css'
})
export class EmployeesListComponent implements OnInit {

  successMessage = "";
  errorMessage = "";

  employeeItems : EmployeeInterface[] =[];

  //constructor de la clase
  constructor(private employeService : EmployeeService){

  }

  ngOnInit(): void {
    this.employeService.getEmployees().subscribe({
      next: (response: any) =>{
        if (response.success) {
          this.employeeItems = response.data;
          this.successMessage = response.message;
          this.errorMessage = ''; // Limpiamos posibles errores previos
        }else{
          this.errorMessage = response.message;
          this.successMessage = ''; // Limpiamos posibles mensajes previos
        }
      },
      error:(error)=>{
      // Si ocurre un error inesperado (problema de red, etc.)
      this.errorMessage = 'Error al cargar los empleados.';
        this.successMessage = '';
        console.error(error); 
      }
    })
  }

}
