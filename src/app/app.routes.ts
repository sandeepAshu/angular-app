import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/guards/auth.guards';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo:'login',
    },
    { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
    {
        path:'login',
        component:LoginComponent
    },
    
    {
        path:'dashboard',
        loadChildren:()=> import('./features/dashboard/dashboard.module').then(m=>m.DashboardModule),
        canActivate:[authGuard]
    },
    { path: '**', redirectTo: '/login' }
    
    
];
