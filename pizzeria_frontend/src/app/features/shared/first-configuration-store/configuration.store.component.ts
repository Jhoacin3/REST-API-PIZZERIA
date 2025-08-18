import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../material-module';
import { AlertService } from '../../../services/alert.service.ts.service';
import { NgForm } from '@angular/forms'; 
import { CanComponentDeactivate } from '../../../core/guards/unsaved-changes.guard';
import { ConfigurationService } from '../../../core/services/configuration.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-configuration.store',
  imports: [RouterOutlet, FormsModule, CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './configuration.store.component.html',
  styleUrl: './configuration.store.component.css'
})
export class ConfigurationStoreComponent implements OnInit, CanComponentDeactivate{
configurationForm!: FormGroup;  
configCreated = false;
  constructor(
    private fb: FormBuilder, 
    private configurationModel: ConfigurationService,
    private router: Router,
    private alertService: AlertService
  ){}
  selectedPhoto: File | null = null;
  previewPhoto: string | ArrayBuffer | null = null;

  ngOnInit() {
 
    this.configurationForm = this.fb.group({
      name: ['', Validators.required],
      photo_url: [''],
      number_of_tables: [0],
      enable: [false],
    });
  }
  
canDeactivate(): boolean {
  if (!this.configCreated) {
    this.alertService.error('', 'Es obligatorio crear una configuración antes de salir.');
    return false; // Bloquea la navegación si no hay configuración creada
  }
  return true; // Permite la navegación si ya se creó la configuración
}

createConfigurations() {
  if (this.configurationForm.valid) {
    // Deshabilita el formulario para evitar doble envío
    this.configurationForm.disable();

    this.configurationModel.createConfiguration(this.configurationForm.value)
      .subscribe({
        next: (response) => {
          if (response.success) {
              this.configCreated = true;
            this.configurationForm.markAsPristine();
            this.alertService.successLogin('', response.message).then((result) => {
              // Solo navega si el usuario confirma
              if (result.isConfirmed) {
                this.router.navigate(['/home']);
              }
              this.router.navigate(['/home']);
            });
          } else {
            this.alertService.error('', response.error);
            this.configurationForm.enable(); // Rehabilita el formulario si hay error
          }
        },
        error: () => {
          this.alertService.error('', 'Error al crear la configuración');
          this.configurationForm.enable(); // Rehabilita el formulario si hay error
        },
      });
  }
}
  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    //validar que sea solamente imagen JPG o PNG
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {

       this.configurationForm.patchValue({
        photo_url: file.name
      });
      this.selectedPhoto = file;
      const reader = new FileReader();
     reader.onload = () => {
       this.previewPhoto = reader.result;
     };
     reader.readAsDataURL(file);

    } else {
      this.alertService.error(
        '',
        'Por favor, seleccione un archivo de imagen válido (JPG o PNG).'
      );
         this.configurationForm.patchValue({
        photo_url: "" 
      });
      this.selectedPhoto = null;
      this.previewPhoto = null;
    }
    // this.configuration.photo_url = file;
  }

}
