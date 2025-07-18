import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../material-module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PaymentService } from '../../../../core/services/payment.service';
import { FormsModule } from '@angular/forms';
import { MenuItemModel } from '../../../../core/models/menu-item.model';
import { MenuService } from '../../../../core/services/menu.service';
import { CreateOrderInterface, GetInsumoByOrder } from '../../../../core/models/create-order-interface';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ApiResponseInterface, OrderDetailsInterface } from '../../../../core/models/order-details-interface';
import { AlertService } from '../../../../services/alert.service.ts.service';

@Component({
  selector: 'app-update-order-payment.component.html',
  imports: [
    CommonModule,
    MaterialModule,
    RouterOutlet,
    FormsModule,
    RouterLink,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './update-order-payment.component.html.component.html',
  styleUrl: './update-order-payment.component.html.component.css',
})
export class UpdateOrderPaymentComponentHtmlComponent implements OnInit {
  successMessage = '';
  errorMessage = '';
  dataOrderUpdate: OrderDetailsInterface[] = [];
  responseTotalOrder = 0;
  employeeNameResponse = "";
  menu: MenuItemModel[] = [];
  selectedId: number | null = null; // ID del insumo seleccionado
  menuDetails: CreateOrderInterface[] = [];
  getInsumoByOrder: GetInsumoByOrder[] = [];

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
    this.getTotalOrder();
    // this.getEmployeeId();
  }

  constructor(
    private paymentService: PaymentService,
    private menuService: MenuService,
    private router: Router,
    private alertService: AlertService
  ) {}

  onSelectItem() {
    const selectedItem = this.menu.find(
      (item) => item.name === this.selectedName
    );

    if (selectedItem) {
      this.selectedId = selectedItem ? selectedItem.id_menu : null;
      const alreadyExists = this.getInsumoByOrder.some(
        (item) => item.id_menu === selectedItem.id_menu
      );

      if (alreadyExists) {
        this.alertService.error(
          '',
          'Este insumo ya ha sido agregado, modifica la cantidad si es necesario.'
        );
        return;
      }
      const orderItem: GetInsumoByOrder = {
        id_order_details: null,
        id_menu: selectedItem.id_menu,
        name: selectedItem.name,
        id_category: selectedItem.id_category,
        type: selectedItem.type,
        amount: 1,
        unit_price: selectedItem.price,
        description: '',
      };

      this.getInsumoByOrder.push(orderItem);
    }
  }

  getMenu(): void {
    this.menuService.getMenuItems().subscribe({
      next: (response) => this.handleResponse(response),
      error: () => this.alertService.error('', 'Error al cargar el menú.'),
    });
  }

  getTotalOrder(): number {
    if (this.getInsumoByOrder.length === 0) {
      return 0;
    }
    this.responseTotalOrder = this.getInsumoByOrder.reduce(
      (acc, item) => acc + item.unit_price * item.amount,
      0
    );
    return this.responseTotalOrder;
  }

  getInsumosByOrder() {
    this.paymentService
      .getInsumosByOrder(this.orderIdSelected, this.tableSelected)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.getInsumoByOrder = response.data.result;
            this.responseTotalOrder = response.data.total;
            this.employeeNameResponse = response.data.employeeName;
          } else {
            this.alertService.error('', response.error);
          }
        },
        error: () => {
          this.alertService.error(
            '',
            'Error al cargar los insumos de la orden.'
          );
        },
      });
  }

  UpdateOrder():void {

    this.paymentService.updateOrder(this.orderIdSelected, this.getInsumoByOrder).subscribe({
      next: (response) => {
        if (response.success) {
          this.alertService.success('', response.message).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/tables']);
            }
            this.router.navigate(['/tables']);
          });
        } else {
          this.alertService.error('', response.error);
          this.successMessage = '';
        }
      },
      error: () => {
        this.alertService.error('', 'Error al actualizar la orden.');
        this.successMessage = '';
      }
    });
  }

  deleteInsumo(item: any): void {
    // Si el insumo tiene id_order_details, eliminar en backend
    if (item.id_order_details) {
      this.paymentService
        .deleteInsumoOrderService(item.id_order_details, this.orderIdSelected)
        .subscribe({
          next: (response) => {
            if (response.success) {
              this.getInsumosByOrder(); // Recarga la tabla
            } else {
              this.alertService.error('', response.error);
            }
          },
          error: () => {
            this.alertService.error('', 'Error al eliminar el insumo de la orden.');
          },
        });
    } else {
      // Si no tiene id_order_details, solo eliminar localmente
      this.getInsumoByOrder = this.getInsumoByOrder.filter(
        (i) => i.id_menu !== item.id_menu
      );
    }
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    this.successMessage = '';
  }

  private getTotalOrderUpdate(): void {
    this.orderDetailId = this.paymentService.getTotalOrderUpdate();
  }

  private getTableId(): void {
    this.tableSelected = this.paymentService.getTableId();
  }

  private getOrderIdSelected(): void {
    this.orderIdSelected = this.paymentService.getOrderIdUpdate();
  }

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
