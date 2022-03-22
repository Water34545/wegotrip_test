import Api from './api';

export const statService = {
  get: () => {
    return Api.get('/stats/plot'); 
  },
};