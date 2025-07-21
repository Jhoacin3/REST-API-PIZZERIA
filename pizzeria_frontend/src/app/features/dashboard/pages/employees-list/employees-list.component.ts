import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../../material-module';
import { EmployeeInterface } from '../../../../core/models/employee-interface';
import { EmployeeService } from '../../../../core/services/employee.service';
import { response } from 'express';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../../services/alert.service.ts.service';

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
  id = 0
  employeeData = {
    full_name: '',
    email: '',
    password: ''
  }
  employeeUpData:any = {};

  employeeItems : EmployeeInterface[] =[];

  //constructor de la clase
  constructor(private employeService : EmployeeService,
     private alertService: AlertService
  ){

  }

  ngOnInit(): void {
    this.getEmployeeTable();
  }

  private getEmployeeTable ():void{
    this.employeService.getEmployees().subscribe({
      next: (response: any) =>{
        if (response.success) {
          this.employeeItems = response.data;
        }else{
          this.alertService.error('', response.error);
        }
      },
      error: () => this.alertService.error("", 'Error al obtener los empleados.'),

    })
  }

  //crear empleado
  employeeAdd(): void {
    if(!this.employeeData.full_name || !this.employeeData.email || !this.employeeData.password){
      this.alertService.error('', "Todos los campos son necesarios");
      return;
    }

    this.employeService.createEmployee(this.employeeData).subscribe({
      next: (response) => {
        if (response.success) {
          this.banderin = true
          this.alertService.success('', response.message);
          this.clearForm();
        } else {
          this.alertService.error('', response.error);
        }
      },
      error: () => this.alertService.error('', "Error al crear el empleado"),
    })
  }

  deleteEmployee():void{
    this.employeService.deleteEmployee(this.id).subscribe({
      next: (response: any) => {
        if (response.success) {
          // this.banderin = true
          this.alertService.success('', response.message);
          window.location.reload();
        } else {
          this.alertService.error('', response.error);
        }
      },
      error: () => this.alertService.error('', "Error al eliminar el empleado"),
    })
  }
  updateEmployee():void{
    this.employeService.updateEmployee(this.employeeUpData.id_employees, this.employeeUpData).subscribe({
      next: (response: any) => {
        if (response.success) {
          // this.banderin = true
          this.alertService.success('', response.message);
          window.location.reload();
        } else {
          this.alertService.error('', response.error);
        }
      },
      error: () => this.alertService.error('', "Error al editar el empleado"),
    })
  }

   //FUNCIONES DE APOYO
   setIdForDelete(id_employee: number){
    this.id = id_employee;

   }
   setIdUpdate(id: number, item: any){
    this.employeeUpData = {...item};
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
