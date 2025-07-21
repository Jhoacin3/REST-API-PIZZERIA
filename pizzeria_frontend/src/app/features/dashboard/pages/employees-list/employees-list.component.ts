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
  paginatedData : EmployeeInterface[] =[];

  // Propiedades para la paginación
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  totalItems: number = 0;
  pagesToShow: number = 5;

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
          this.calculatePagination();
        }else{
          this.alertService.error('', response.error);
        }
      },
      error: () => this.alertService.error("", 'Error al obtener los empleados.'),

    })
  }

  /**
   * Métodos de Paginación
   *
   * @returns {void} No retorna ningún valor.
   */
  calculatePagination(): void {
    this.totalItems = this.employeeItems.length;
    this.totalPages = Math.max(
      1,
      Math.ceil(this.totalItems / this.itemsPerPage)
    );
    this.goToPage(1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.employeeItems.slice(startIndex, endIndex);
  }

  getPages(): number[] {
    const pages: number[] = [];
    const startPage = Math.max(
      1,
      this.currentPage - Math.floor(this.pagesToShow / 2)
    );
    const endPage = Math.min(this.totalPages, startPage + this.pagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
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
