import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../material-module';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeInterface } from '../../../../core/models/employee-interface';
import { CreateOrderInterface } from '../../../../core/models/create-order-interface';
import { EmployeeService } from '../../../../core/services/employee.service';
import { MenuService } from '../../../../core/services/menu.service';
import { TablesListComponent } from '../../../../features/dashboard/pages/tables-list/tables-list.component';
import { PaymentService } from '../../../../core/services/payment.service';
import { MenuItemModel } from '../../../../core/models/menu-item.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AlertService } from '../../../../services/alert.service.ts.service'; // Ajusta la ruta

@Component({
  selector: 'app-order-payment',
  imports: [CommonModule, MaterialModule, RouterOutlet, FormsModule, RouterLink,
    MaterialModule, MatToolbarModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './order-payment.component.html',
  styleUrl: './order-payment.component.css'
})
export class OrderPaymentComponent implements OnInit{
   successMessage = "";
   errorMessage = "";
   selectEmployee= "";
   employeeItems : EmployeeInterface[] =[];

   employees_id = 0;
   menuDetails: CreateOrderInterface[] = [];
   selectedTableId: number | null = null;
   selectedName: string = ''; // Nombre seleccionado del input
   selectedId: number | null = null; // ID del insumo seleccionado
    menu: MenuItemModel[] = [];
  
    constructor(
      private employeService : EmployeeService,
      private paymentService: PaymentService,
      private menuService : MenuService,
      private router: Router,
      private alertService: AlertService   
    ){}

  ngOnInit(): void {
    this.getEmployeeSelect();
    this.getSelectedTableId();
    this.getMenu();
    this.getTotalOrder();
  }
  onSelectItem() {
    const selectedItem = this.menu.find(item => item.name === this.selectedName);
    this.selectedId = selectedItem ? selectedItem.id_menu : null;
    if (selectedItem) {
      const orderItem: CreateOrderInterface = {
        id_menu: selectedItem.id_menu,
        name: selectedItem.name,
        id_category: selectedItem.id_category,
        type: selectedItem.type,
        amount: 1, //cambiar
        unit_price: selectedItem.price,
        description: selectedItem.description
      };

      this.menuDetails.push(orderItem);
      console.log('Insumos seleccionados:', this.menuDetails);
    }
  }
  getTotalOrder(): number {
    if (this.menuDetails.length === 0) {
      return 0;
    }
    return this.menuDetails.reduce((acc, item) => acc + item.unit_price * item.amount, 0);
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

  getMenu(): void{
    this.menuService.getMenuItems().subscribe({
      next: (response) => this.handleResponse(response),
      error: () => this.handleError('Error al cargar el menú.'),
    })
  }

  createOrder(): void{
    // if(!this.employees_id || !this.selectedTableId)
    //   {
    //     this.errorMessage = 'Todos los campos son requeridos';
    //     return;
    //   }
    

    this.paymentService
      .createOrden(this.employees_id, this.selectedTableId, this.menuDetails)
      .subscribe({
        next: (response) => {
          if (response.success) {

            console.log('Orden creada:', response.data);
            this.alertService
              .success(
                '', response.messages
              )
              .then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['/tables']);
                }
                this.router.navigate(['/tables']);
              });
            this.successMessage = response.messages;
            this.errorMessage = '';

          } else {
            this.alertService.error('', response.error);
          }
        },
        error: () => this.alertService.error('', 'Error al crear la orden')
      });

  }

  private handleError(message: string): void {
    this.errorMessage = message;
    this.successMessage = '';
  }
  private getSelectedTableId(): void {
    this.selectedTableId = this.paymentService.getTableId();
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
