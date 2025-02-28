import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ConfigurationInterface  } from '../../../../core/models/configuration-interface';
import { ConfigurationService } from '../../../../core/services/configuration.service';
import {MaterialModule} from '../../../../material-module';

@Component({
  selector: 'app-configuration-list',
  imports: [CommonModule, RouterOutlet, MaterialModule],
  templateUrl: './configuration-list.component.html',
  styleUrl: './configuration-list.component.css'
})
export class ConfigurationListComponent implements OnInit {
  errorMessage = '';
  successMessage = '';
  employeeData: ConfigurationInterface[] = [];

  constructor (private employeeModel:ConfigurationService){}
  
  ngOnInit(): void {
    this.getConfigs();
  }
  //Metodo para obtener las configuraciones
  private getConfigs(): void {
    this.employeeModel.getConfig().subscribe({
      next: (response: any) => {
        if(response.success){
          this.employeeData = response.data;
          this.successMessage = response.message
          this.errorMessage = ""
          this.clearForm()
        }else{
          this.handleError(response.error)
        }
      },
      error: () => this.handleError('Error al cargar el menú.'),
    })
  }

   //FUNCIONES DE APOYO
    private handleError(message: string): void {
      this.errorMessage = message;
      this.successMessage = '';
    }

  clearForm() {
    // this.employeeData = {   
    //   id_store_info: 0,
    //   name: "",
    //   photo_url: "",
    //   number_of_tables: "",
    //   enable: false};
    this.getConfigs();
  }

}
