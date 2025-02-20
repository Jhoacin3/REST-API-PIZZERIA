import { RouterModule, Routes } from '@angular/router';
import { MenuListComponent } from './features/dashboard/pages/menu-list/menu-list.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './features/dashboard/pages/home/home.component';
import { EmployeesListComponent } from './features/dashboard/pages/employees-list/employees-list.component';
import { CategoriesListComponent } from './features/dashboard/pages/categories-list/categories-list.component';
import { TablesListComponent } from './features/dashboard/pages/tables-list/tables-list.component';
import { ConfigurationListComponent } from './features/dashboard/pages/configuration-list/configuration-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirige a /menu por defecto
    { path: 'home', component: HomeComponent }, // Ruta para el home
    { path: 'menu', component: MenuListComponent }, // Ruta para el menú
    { path: 'employees', component: EmployeesListComponent }, // Ruta para el menú
    { path: 'category', component: CategoriesListComponent }, // Ruta para el categorias
    { path: 'tables', component: TablesListComponent }, // Ruta para el mesas
    { path: 'configuration', component: ConfigurationListComponent }, // Ruta para las configuraciones propias del negocio
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
