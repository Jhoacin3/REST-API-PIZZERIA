import { Component, OnInit, inject } from '@angular/core';
import { PaymentService } from '../../../../core/services/payment.service';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {MaterialModule} from '../../../../material-module';
import { TablesInterface } from '../../../../core/models/tables-interface';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OrderDetailsInterface } from '../../../../core/models/order-details-interface';
import { AlertService } from '../../../../services/alert.service.ts.service';

@Component({
  selector: 'app-tables-list',
  imports: [
    CommonModule,
    RouterOutlet,
    MaterialModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './tables-list.component.html',
  styleUrl: './tables-list.component.css',
})
export class TablesListComponent implements OnInit {
  errorMessage = '';
  successMessage = '';
  tablesInterface: TablesInterface[] = [];
  orderDetailsRes: OrderDetailsInterface[] = [];
  orderDataUpdate: any = {};

  tableSelectId = 0;
  orderIdSelected = 0;
  orderTotal = '';
  tableIdForDetails = 0;
  employees_id: any;

  constructor(
    private paymentService: PaymentService,
    private alertService: AlertService,
    private router: Router
  ) {}
  //subscribe: metodo que permite escuchar y maneja dos escenario: next y error
  ngOnInit(): void {
    this.getTables();
  }

  getTables(): void {
    this.paymentService.GetNumberTables().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.tablesInterface = response.data;
        } else {
          this.alertService.error('', response.message);
        }
      },
      error: (error) => {
        // Si ocurre un error inesperado (problema de red, etc.)
        this.alertService.error('', 'Error al cargar las mesas.');
      },
    });
  }

  getOrderDetails(order_id: number | null, id_tables: number): void {
    this.tableIdForDetails = id_tables;

    this.paymentService.getOrderDetails(order_id).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.orderDetailsRes = response.data.result;
          this.orderTotal = response.data.total;
          this.orderIdSelected = response.data.orderIdSelected;
          this.employees_id = response.data.employees_id;
          this.setIdUpdate(
            this.orderIdSelected,
            this.orderTotal,
            this.orderDetailsRes,
            this.employees_id
          );
        } else {
          this.alertService.error('', response.error);
        }
      },
      error: (error) => {
        this.alertService.error('', 'Error al obtener los detalles.');
      },
    });
  }

  orderPayment(): void {
    this.paymentService.orderPaid(this.orderIdSelected).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.alertService.success('', response.messages).then((result) => {
            if (result.isConfirmed) {
              this.getTables();
            }
              this.getTables();
          });
        } else {
          this.alertService.error('', response.error);
        }
      },
      error: (error) => {
        this.alertService.error('', 'Error al procesar el pago.');
      },
    });
  }

  setIdTable(id: number): void {
    this.paymentService.setTableId(id);
  }
  setIdUpdate(
    orderIdSelected: number,
    id: string,
    data: any,
    employees_id: number
  ) {
    this.paymentService.setIdUpdate(orderIdSelected, id, data, employees_id);
  }

}
