import api from './api';

export interface UpdateProfilePayload {
  fullName?: string;
  phoneNumber?: string;
  avatar?: string;
  [key: string]: any;
}

export const userService = {
  getProfile: async () => {
    // UPDATED: /api/users/me/profile
    const response = await api.get('/api/users/me/profile');
    return response.data;
  },

  updateProfile: async (data: UpdateProfilePayload) => {
    // UPDATED: /api/users/me/profile
    const response = await api.put('/api/users/me/profile', data);
    return response.data;
  },

  getAllUsers: async () => {
    // No direct "get all users" found in openapi, removing or keeping as placeholder if admin
    const response = await api.get('/api/users'); 
    return response.data;
  },
  
  getUserById: async (id: string) => {
    // No direct get user by id, usually admin only. 
    const response = await api.get(`/api/users/${id}`);
    return response.data;
  }
};
