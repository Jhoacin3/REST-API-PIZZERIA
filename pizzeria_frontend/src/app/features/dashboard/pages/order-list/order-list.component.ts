import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../../material-module';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../../../core/services/payment.service';
import { OrdersInterface } from '../../../../core/models/orders-interface';
import { OrderDetailsInterface } from '../../../../core/models/order-details-interface';

@Component({
  selector: 'app-order-list',
  imports: [CommonModule, RouterOutlet, MaterialModule, FormsModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  successMessage = "";
  errorMessage = "";
  ordersInterface: OrdersInterface[] = [];
  orderDetailsRes: OrderDetailsInterface[] = [];
  orderTotal: string = '';

  constructor(private privateaymentService: PaymentService){}
  ngOnInit(): void {
    this.getOrderAll();
  }
  getOrderAll(): void{
    this.privateaymentService.getOrderAll().subscribe({
      next:(response: any) => {
        if(response.success){
          this.ordersInterface = response.data
          this.successMessage = response.message
          this.errorMessage = '';
        }else{
          this.handleError(response.error);
        }
        
      },
      error:()=> {
        this.handleError("No se pudo obtener las ordenes, error de red")
      }
    })
  }

  getOrderDetails(id : number): void{
    this.privateaymentService.getOrderDetails(id).subscribe({
      next: (response : any) => {
        if(response.success){
          this.orderDetailsRes = response.data.result
          this.orderTotal = response.data.total
          this.successMessage = response.messages
          this.errorMessage = "";
        }else{
          this.handleError(response.error);
        }

      },
      error: () => {
        this.handleError("No se pudo obtener los detalles de la orden, error de red")
      }

    })
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    this.successMessage = '';
  }

}
