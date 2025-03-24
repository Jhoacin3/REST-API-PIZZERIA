import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../material-module';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeInterface } from '../../../../core/models/employee-interface';
import { EmployeeService } from '../../../../core/services/employee.service';

@Component({
  selector: 'app-order-payment',
  imports: [CommonModule, MaterialModule, RouterOutlet, FormsModule],
  templateUrl: './order-payment.component.html',
  styleUrl: './order-payment.component.css'
})
export class OrderPaymentComponent implements OnInit{
   successMessage = "";
   errorMessage = "";
   selectEmployee= "";
   employeeItems : EmployeeInterface[] =[];

    constructor(private employeService : EmployeeService){}

  ngOnInit(): void {
    this.getEmployeeSelect();
  }

  getEmployeeSelect():void {
    this.employeService.getEmployees().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.employeeItems = response.data;
          this.successMessage = response.message;
          this.errorMessage = ''; // Limpiamos posibles errores previos

        } else {
          this.handleError(response.error);
        }
      },
      error: () => this.handleError('Error al editar el empleado')
    })
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    this.successMessage = '';
  }

}
