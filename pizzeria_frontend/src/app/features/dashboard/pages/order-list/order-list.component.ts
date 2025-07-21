import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../../material-module';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../../../core/services/payment.service';
import { OrdersInterface } from '../../../../core/models/orders-interface';
import { OrderDetailsInterface } from '../../../../core/models/order-details-interface';
import { AlertService } from '../../../../services/alert.service.ts.service';

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
  paginatedData: OrdersInterface[] = [];
  orderDetailsRes: OrderDetailsInterface[] = [];
  orderTotal: string = '';

  // Propiedades para la paginación
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 0;
  totalItems: number = 0;
  pagesToShow: number = 5;

  constructor(
    private privateaymentService: PaymentService,
    private alertService: AlertService

  ){}
  ngOnInit(): void {
    this.getOrderAll();
  }
  getOrderAll(): void{
    this.privateaymentService.getOrderAll().subscribe({
      next:(response: any) => {
        if(response.success){
          this.ordersInterface = response.data;
          this.calculatePagination();
        }else{
          this.alertService.error('', response.error);
        }
        
      },
      error:()=> {
          this.alertService.error('', "No se pudo obtener las ordenes");
      }
    })
  }

    /**
   * Métodos de Paginación
   *
   * @returns {void} No retorna ningún valor.
   */
  calculatePagination(): void {
    this.totalItems = this.ordersInterface.length;
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
    this.paginatedData = this.ordersInterface.slice(startIndex, endIndex);
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

  getOrderDetails(id : number): void{
    this.privateaymentService.getOrderDetails(id).subscribe({
      next: (response : any) => {
        if(response.success){
          this.orderDetailsRes = response.data.result
          this.orderTotal = response.data.total
        }else{
          this.alertService.error('', response.error);
        }
      },
      error: () => {
        this.alertService.error('', "No se pudo obtener los detalles de la orden");
      }

    })
  }

}
