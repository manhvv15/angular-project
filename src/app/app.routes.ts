import { Routes } from '@angular/router';
import { StockComponent } from '../component/stock/stock.component';
import { AppComponent } from './app.component';
import { LoginComponent } from '../views/login/login.view';
import { CommentComponent } from '../views/comments/comment.view';

export const routes: Routes = [
  { path: 'stocks', component: StockComponent },
  { path: 'comments', component: CommentComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: AppComponent },
  { path: '**', redirectTo: '' },
];
