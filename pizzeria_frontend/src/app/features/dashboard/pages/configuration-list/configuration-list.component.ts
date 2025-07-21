import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ConfigurationInterface  } from '../../../../core/models/configuration-interface';
import { ConfigurationService } from '../../../../core/services/configuration.service';
import {MaterialModule} from '../../../../material-module';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../../../services/alert.service.ts.service';

@Component({
  selector: 'app-configuration-list',
  imports: [CommonModule, RouterOutlet, MaterialModule, FormsModule],
  templateUrl: './configuration-list.component.html',
  styleUrl: './configuration-list.component.css'
})
export class ConfigurationListComponent implements OnInit {
  errorMessage = '';
  successMessage = '';
  employeeData: ConfigurationInterface[] = [];
  //OBJETO PARA ALMACENAR LOS DATOS DEL FORMULARIO AL CREAR UNA NUEVA CONFIGURACION
  createConfigInterface = {
    name: '',
    photo_url: '',
    number_of_tables: 0,
    enable: false
  };

  constructor (
    private configurationModel: ConfigurationService,
    private alertService: AlertService
    
  ){}
  
  ngOnInit(): void {
    this.getConfigs();
  }
  //Metodo para obtener las configuraciones
  private getConfigs(): void {
    this.configurationModel.getConfig().subscribe({
      next: (response: any) => {
        if(response.success){
          this.employeeData = response.data;
          this.successMessage = response.message
          this.errorMessage = ""
          // this.clearForm()
        }else{
          this.handleError(response.error)
        }
      },
      error: () => this.handleError('Error al cargar el menú.'),
    })
  }

  createConfigurations():void{
    this.configurationModel.createConfiguration(this.createConfigInterface).subscribe({
      next:(response) =>{
        if(response.success){
          this.alertService.success('', response.message);
          this.clearForm();
        }else{
          this.alertService.error('', response.error);
        }
      },
      error: () => this.alertService.error("", 'Error al crear la configuración'),
    })

  }

   //FUNCIONES DE APOYO
    private handleError(message: string): void {
      this.errorMessage = message;
      this.successMessage = '';
    }

    onFileSelected(event: any) {
  const file = event.target.files[0];
  //validar que sea solamente imagen JPG o PNG
  if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
    this.createConfigInterface.photo_url = file;
  } else {
    this.alertService.error('', 'Por favor, seleccione un archivo de imagen válido (JPG o PNG).');
    this.createConfigInterface.photo_url = '';
  }
  this.createConfigInterface.photo_url = file;
}

  clearForm() {
    this.createConfigInterface = {   
    name: '',
    photo_url: '',
    number_of_tables: 0,
    enable: false
    };
    this.getConfigs();
  }

}
