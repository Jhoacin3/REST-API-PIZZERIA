import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../material-module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeInterface } from '../../../../core/models/employee-interface';
import { EmployeeService } from '../../../../core/services/employee.service';
import { TablesListComponent } from '../../../../features/dashboard/pages/tables-list/tables-list.component';
import { PaymentService } from '../../../../core/services/payment.service';

@Component({
  selector: 'app-order-payment',
  imports: [CommonModule, MaterialModule, RouterOutlet, FormsModule, RouterLink],
  templateUrl: './order-payment.component.html',
  styleUrl: './order-payment.component.css'
})
export class OrderPaymentComponent implements OnInit{
   successMessage = "";
   errorMessage = "";
   selectEmployee= "";
   employeeItems : EmployeeInterface[] =[];
   selectedTableId: number | null = null;
    constructor(
      private employeService : EmployeeService,
      private paymentService: PaymentService
    ){}

  ngOnInit(): void {
    this.getEmployeeSelect();
    this.getSelectedTableId();
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
  private getSelectedTableId(): void {
    this.selectedTableId = this.paymentService.getTableId();
  }

}
