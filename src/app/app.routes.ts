import { Routes } from '@angular/router';
import { StockComponent } from '../component/stock/stock.component';
import { AppComponent } from './app.component';
import { LoginComponent } from '../views/login/login.view';

export const routes: Routes = [
  { path: 'stocks', component: StockComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: AppComponent },
  { path: '**', redirectTo: '' },
];
