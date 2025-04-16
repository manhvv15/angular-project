// const PREFIX = '/api';
// export const stock = {
//   getAll: `${PREFIX}/stocks`,
//   getPaging: `${PREFIX}/stocks`,
//   getById: `${PREFIX}/stocks/{id}`,
//   create: `${PREFIX}/stocks`,
//   update: `${PREFIX}/stocks`,
//   delete: `${PREFIX}/stocks/{id}`,

import { environment } from '../api.config';

// };
export const stock = {
  getAll: `${environment.apiBaseUrl}${'/api/stocks/paging'}`,
  getPaging: `${environment.apiBaseUrl}${'/api/stocks/paging'}`,
  getById: `${environment.apiBaseUrl}${'/api/stocks/{id}'}`,
  create: `${environment.apiBaseUrl}${'/api/stocks'}`,
  update: `${environment.apiBaseUrl}${'/api/stocks'}`,
  delete: `${environment.apiBaseUrl}${'/api/stocks/{id}'}`,
};
