import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { stock } from './endpoint';
import { StockResponse } from '../types/stock';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private http: HttpClient) {}

  getStocks(): Observable<StockResponse> {
    return this.http.get<StockResponse>(stock.getAll);
  }

  getStock(id: string): Observable<any> {
    const url = stock.getById.replace('{id}', id);
    return this.http.get<any>(url);
  }

  createStock(stock: any): Observable<any> {
    return this.http.post<any>(stock.create, stock);
  }

  updateStock(id: string, stock: any): Observable<any> {
    const url = stock.update.replace('{id}', id);
    return this.http.put<any>(url, stock);
  }

  deleteStock(id: string): Observable<any> {
    const url = stock.delete.replace('{id}', id);
    return this.http.delete<any>(url);
  }
}
