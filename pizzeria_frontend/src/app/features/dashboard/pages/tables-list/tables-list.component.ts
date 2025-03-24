import { Component, OnInit, inject } from '@angular/core';
import { PaymentService } from '../../../../core/services/payment.service';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import {MaterialModule} from '../../../../material-module';
import { TablesInterface } from '../../../../core/models/tables-interface';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-tables-list',
  imports: [ CommonModule, RouterOutlet, MaterialModule, MatToolbarModule,
      MatButtonModule,
      RouterModule,
      MatSidenavModule,
      MatListModule,],
  templateUrl: './tables-list.component.html',
  styleUrl: './tables-list.component.css'
})
export class TablesListComponent implements OnInit {
  errorMessage = '';
  successMessage = '';
  tablesInterface: TablesInterface[] = [];


  constructor(private paymentService: PaymentService){}
  //subscribe: metodo que permite escuchar y maneja dos escenario: next y error
  ngOnInit(): void {
   this.paymentService.GetNumberTables().subscribe({
    next: (response: any) => {
      if(response.success){
        this.tablesInterface = response.data;
        this.successMessage = response.message;
        this.errorMessage = '';
      }else{
        this.errorMessage = response.message;
        this.successMessage = '';
      }

    },
    error: (error) => {
      // Si ocurre un error inesperado (problema de red, etc.)
      this.errorMessage = 'Error al cargar las mesas.';
      this.successMessage = '';
      console.error(error);    
    }
   })
  }

}
