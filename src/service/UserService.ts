import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { user } from './endpoint';
import { Login } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  login(data: Login): Promise<AxiosResponse<any>> {
    return axios.post(user.login, data);
  }
  register(data: Login): Promise<AxiosResponse<any>> {
    return axios.post(user.register, data);
  }
}
