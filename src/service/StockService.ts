import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { stock } from './endpoint';
import { Stock, StockResponse } from '../types/stock';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor() {}

  getStocks(): Promise<AxiosResponse<StockResponse>> {
    return axios.get<StockResponse>(stock.getAll);
  }

  getStock(id: string): Promise<AxiosResponse<any>> {
    const url = stock.getById.replace('{id}', id);
    return axios.get<any>(url);
  }

  createStock(data: Stock): Promise<AxiosResponse<any>> {
    return axios.post(stock.create, data);
  }

  updateStock(data: Stock): Promise<AxiosResponse> {
    const url = stock.update;
    return axios.put(url, data);
  }

  deleteStock(id: string): Promise<AxiosResponse<any>> {
    const url = stock.delete.replace('{id}', id);
    return axios.delete<any>(url);
  }
}
