import api from './api';

export interface Salon {
  id: string;
  name: string;
  address: string;
  description: string;
  rating: number;
  images: string[];
  [key: string]: any;
}

export const salonService = {
  getAllSalons: async (params?: any) => {
    // UPDATED: /api/salons/
    const response = await api.get('/api/salons/', { params });
    return response.data;
  },

  getSalonById: async (id: string) => {
    // UPDATED: /api/salons/{salon_id}
    const response = await api.get(`/api/salons/${id}`);
    return response.data;
  },

  createSalon: async (data: any) => {
    // Only found vendor specific endpoints like /api/vendor/salons
    const response = await api.post('/api/vendor/salons', data);
    return response.data;
  },
  
  updateSalon: async (id: string, data: any) => {
    const response = await api.put(`/api/vendor/salons/${id}`, data);
    return response.data;
  },
  
  deleteSalon: async (id: string) => {
    const response = await api.delete(`/api/vendor/salons/${id}`);
    return response.data;
  }
};
