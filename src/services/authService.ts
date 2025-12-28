import api from './api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
    [key: string]: any;
  };
}

export const authService = {
  login: async (credentials: LoginPayload) => {
    // UPDATED PATH: /api/users/login
    const response = await api.post<AuthResponse>('/api/users/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  register: async (data: RegisterPayload) => {
    // UPDATED PATH: /api/users/register
    const response = await api.post<AuthResponse>('/api/users/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: async () => {
    // UPDATED PATH: /api/users/logout
    try {
        await api.post('/api/users/logout');
    } catch (error) {
        console.error("Logout failed on server", error);
    } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
  },
  
  getCurrentUser: async () => {
      // UPDATED PATH: /api/users/me
      const response = await api.get('/api/users/me');
      return response.data;
  }
};
