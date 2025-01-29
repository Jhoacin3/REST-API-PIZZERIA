

//almacenraá todos los módulos de Angular Material que necesitamos en nuestra aplicación.
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    imports: [
    //aqui se le agregan los modulos de material
    MatButtonModule
    ],
    exports: [
    //aqui se exportan los modulos de material
    MatButtonModule
    ]
})
export class MaterialModule {

}