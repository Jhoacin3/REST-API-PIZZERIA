import { RouterModule, Routes } from '@angular/router';
import { MenuListComponent } from './features/dashboard/pages/menu-list/menu-list.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './features/dashboard/pages/home/home.component';
import { EmployeesListComponent } from './features/dashboard/pages/employees-list/employees-list.component';
import { CategoriesListComponent } from './features/dashboard/pages/categories-list/categories-list.component';
import { TablesListComponent } from './features/dashboard/pages/tables-list/tables-list.component';
import { ConfigurationListComponent } from './features/dashboard/pages/configuration-list/configuration-list.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { PageErrorComponent } from './features/shared/page-error/page-error.component';
import { OrderPaymentComponent } from './features/dashboard/pages/order-payment/order-payment.component';
import { OrderListComponent } from './features/dashboard/pages/order-list/order-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige a /login por defecto
    { path: 'home', component: HomeComponent, canActivate: [authGuard] }, // Ruta para el home
    { path: 'login', component: LoginComponent }, // Ruta para el home
    { path: 'menu', component: MenuListComponent, canActivate: [authGuard] }, // Ruta para el menú
    { path: 'ordenes', component: OrderListComponent, canActivate: [authGuard] }, // Ruta para el menú
    { path: 'employees', component: EmployeesListComponent, canActivate: [authGuard] }, // Ruta para el menú
    { path: 'category', component: CategoriesListComponent, canActivate: [authGuard] }, // Ruta para el categorias


    { path: 'tables', component: TablesListComponent, canActivate: [authGuard] }, // Ruta para el mesas
    { path: 'orderPayment', component: OrderPaymentComponent, canActivate: [authGuard] },


    
    { path: 'configuration', component: ConfigurationListComponent, canActivate: [authGuard] }, // Ruta para las configuraciones propias del negocio
    { path: '**', component: PageErrorComponent }
    // { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
