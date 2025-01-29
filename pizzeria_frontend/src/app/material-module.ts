

//almacenraá todos los módulos de Angular Material que necesitamos en nuestra aplicación.
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports: [
    //aqui se le agregan los modulos de material
    MatButtonModule, MatDividerModule, MatIconModule
    ],
    exports: [
    //aqui se exportan los modulos de material
    MatButtonModule, MatDividerModule, MatIconModule

    ]
})
export class MaterialModule {

}