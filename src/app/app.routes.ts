import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { EmployeesComponent } from './employees/employees.component';

export const routes: Routes = [    
    { path: '', component: LoginComponent },
    {path:'Home',component:HomeComponent},
    {path:'user/:id',component:UserComponent},
    {path:'Employees',component:EmployeesComponent}
];
