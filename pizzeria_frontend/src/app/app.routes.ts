import { RouterModule, Routes } from '@angular/router';
import { MenuListComponent } from './features/dashboard/pages/menu-list/menu-list.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './features/dashboard/pages/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirige a /menu por defecto
    { path: 'home', component: HomeComponent }, // Ruta para el home
    { path: 'menu', component: MenuListComponent }, // Ruta para el menú
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
