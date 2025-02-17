import { Component, OnInit, inject } from '@angular/core';
import { PaymentService } from '../../../../core/services/payment.service';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tables-list',
  imports: [ CommonModule, RouterOutlet],
  templateUrl: './tables-list.component.html',
  styleUrl: './tables-list.component.css'
})
export class TablesListComponent implements OnInit {
  errorMessage = '';
  successMessage = '';
  number_of_tables: number[] = [];
//   number_of_tables = 0;

  constructor(private paymentService: PaymentService){}
  //subscribe: metodo que permite escuchar y maneja dos escenario: next y error
  ngOnInit(): void {
    this.paymentService.GetNumberTables().subscribe({
      next: (response:any) =>{
        if(response.success){
          const numberOfTables = response.data;
          //   this.number_of_tables = response.data;
          this.number_of_tables = Array.from({ length: numberOfTables }, (_, i) => i + 1);
          this.successMessage = response.message;
          this.errorMessage = ''; // Limpiamos posibles errores previos
        }else{
          this.errorMessage = response.message;
          this.successMessage = ''; // Limpiamos posibles mensajes previos
        }

      },
      error: (error)=>{
        // Si ocurre un error inesperado (problema de red, etc.)
        this.errorMessage = 'Error al cargar el menú.';
        this.successMessage = '';
        console.error(error);    
      }
    })
  }

}
