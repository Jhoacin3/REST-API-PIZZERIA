import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../material-module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PaymentService } from '../../../../core/services/payment.service';
import { FormsModule } from '@angular/forms';
import { MenuItemModel } from '../../../../core/models/menu-item.model';
import { MenuService } from '../../../../core/services/menu.service';
import { CreateOrderInterface } from '../../../../core/models/create-order-interface';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ApiResponseInterface, OrderDetailsInterface } from '../../../../core/models/order-details-interface';

@Component({
  selector: 'app-update-order-payment.component.html',
  imports: [CommonModule, MaterialModule, RouterOutlet, FormsModule, RouterLink, MatToolbarModule, MatSidenavModule, MatListModule],
  templateUrl: './update-order-payment.component.html.component.html',
  styleUrl: './update-order-payment.component.html.component.css'
})
export class UpdateOrderPaymentComponentHtmlComponent implements OnInit {
  successMessage = "";
   errorMessage = "";
   dataOrderUpdate: OrderDetailsInterface[] = [];
   responseTotalOrder = 0; 
   responseEmployees_id = 0;
  // dataOrderUpdate: {
  //   id_menu: number;
  //   employees_id: number;
  //   name: string;
  //   unit_price: number;
  //   id_category: number;
  //   amount: number;
  //   type: string;
  //   description: string;
  //   id_order_details?: number;
  // }[] = [];
  menu: MenuItemModel[] = [];
  selectedId: number | null = null; // ID del insumo seleccionado
   menuDetails: CreateOrderInterface[] = [];

  orderDetailId = 0;
  tableSelected: any;
  orderIdSelected = 0;
  selectedName: string = ''; // Nombre seleccionado del input
  ngOnInit(): void {
    this.getOrderIdSelected();
    this.getTableId();
    this.getInsumosByOrder();
    // this.getdataOrderUpdate();
    this.getTotalOrderUpdate();
    this.getMenu();
    // this.getEmployeeId();
  }

      constructor(
        private paymentService: PaymentService,
        private menuService : MenuService,
        private router: Router // Inyecta el servicio Router        
      ){}

      // onSelectItem() {
      //     const selectedItem = this.menu.find(item => item.name === this.selectedName);

          
      //     if (!selectedItem) {
      //       this.errorMessage = 'Insumo no válido o no encontrado.';
      //       return;
      //     }
      //     this.selectedId = selectedItem.id_menu;

      //     const alreadyExists = this.dataOrderUpdate.some(item => item.id_menu === selectedItem.id_menu);

      //     if (alreadyExists) {
      //     this.errorMessage = 'Este insumo ya ha sido agregado.';
      //     return;
      //     }
        
          
      //     this.selectedId = selectedItem ? selectedItem.id_menu : null;
      //     if (selectedItem) {
      //       const orderItem = {
      //         id_menu: selectedItem.id_menu,
      //         employees_id: this.employees_id,
      //         name: selectedItem.name,
      //         id_category: selectedItem.id_category,
      //         type: selectedItem.type,
      //         amount: 1,
      //         unit_price: selectedItem.price,
      //         description: selectedItem.description
      //       };
      
      //       this.dataOrderUpdate.push(orderItem);
      //       console.log('Insumos seleccionados 2:', this.dataOrderUpdate);
      //     }
      //   }
        getMenu(): void{
          this.menuService.getMenuItems().subscribe({
            next: (response) => this.handleResponse(response),
            error: () => this.handleError('Error al cargar el menú.'),
          })
        }

        getInsumosByOrder() {
          console.log('ID de la orden seleccionada:', this.orderIdSelected);
          console.log('ID de la mesa seleccionada:', this.tableSelected);``
          this.paymentService.getInsumosByOrder(this.orderIdSelected, this.tableSelected).subscribe({
            next: (response) => {
              if (response.success) {
                this.dataOrderUpdate = response.data.result;
                console.log('Los detalles de la orden son: ', this.dataOrderUpdate);
                this.responseTotalOrder = response.data.total;
                this.responseEmployees_id = response.data.employees_id;
                this.successMessage = response.message;
                this.errorMessage = '';
              } else {
                this.handleError(response.error);
                this.successMessage = '';
              }
            },
            error: () => {
              this.handleError('Error al cargar los insumos de la orden.');
              this.successMessage = '';
            }
          });
        }


        //sdsdsdsdsdddddddddddddddddddddddddddddddddddddddddddddddd

        // UpdateOrder():void {
          
        //   // console.log('Los detalles de la orden son: ', orderDetails);
        //   this.paymentService.updateOrder(this.orderIdSelected, this.dataOrderUpdate).subscribe({
        //     next: (response) => {
        //       if (response.success) {
        //         this.successMessage = response.message;
        //         this.errorMessage = '';
        //         this.router.navigate(['/tables']); // Redirige a la ruta deseada                
        //       } else {
        //         this.handleError(response.error);
        //         this.successMessage = '';
        //       }
        //     },
        //     error: () => {
        //       this.handleError('Error al actualizar la orden.');
        //       this.successMessage = '';
        //     }
        //   });
        // }

        deleteInsumo(id: number): void {
          this.paymentService.deleteInsumoOrderService(id, this.orderIdSelected).subscribe({
            next: (response) => {
              if (response.success) {
                // console.log('Los detalles de la orden son: ', this.dataOrderUpdate);
                // this.dataOrderUpdate = this.dataOrderUpdate.filter(item => item.id_menu !== id);
                this.successMessage = response.message;
                this.errorMessage = '';
              } else {
                this.handleError(response.error);
                this.successMessage = '';
              }
            },
            error: () => {
              this.handleError('Error al eliminar el insumo de la orden.');
              this.successMessage = '';
            }
          });
        }
        private handleError(message: string): void {
          this.errorMessage = message;
          this.successMessage = '';
        }
        // private getdataOrderUpdate(): void {
        //   const rawData = this.paymentService.getdataOrderUpdate();
        //   // console.log('Los datos de la orden rawData: ', rawData);
        //   this.dataOrderUpdate = Array.isArray(rawData) ? rawData : Object.values(rawData);
        //   console.log("holaaaaa: ", rawData)
        // }
        
      private getTotalOrderUpdate(): void {
        this.orderDetailId = this.paymentService.getTotalOrderUpdate();
      }

      private getTableId(): void {
        this.tableSelected = this.paymentService.getTableId();
      }

      // private getEmployeeId(): void {
      //   this.employees_id = this.paymentService.getEmployeeId();
      // }

      private getOrderIdSelected(): void {
        this.orderIdSelected = this.paymentService.getOrderIdUpdate();
      }

      // getTotalOrder(): number {
      //   if (this.dataOrderUpdate.length === 0) {
      //     return 0;
      //   }
      //   return this.dataOrderUpdate.reduce((acc, item) => acc + item.unit_price * item.amount, 0);
      // }

      private handleResponse<T>(response: any): void {
        if (response.success) {
          this.menu = response.data;
          this.successMessage = response.message;
          this.errorMessage = '';
        } else {
          this.handleError(response.message);
          this.successMessage = '';
        }
      }

}
