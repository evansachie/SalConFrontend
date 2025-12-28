import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { salonService, Salon } from '../../services/salonService';

interface SalonState {
  salons: Salon[];
  currentSalon: Salon | null;
  loading: boolean;
  error: string | null;
}

const initialState: SalonState = {
  salons: [],
  currentSalon: null,
  loading: false,
  error: null,
};

export const fetchSalons = createAsyncThunk(
  'salon/fetchAll',
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await salonService.getAllSalons(params);
      // Assuming response is an array or has a data property containing the array
      // Adjust based on actual API response structure
      return response; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch salons');
    }
  }
);

export const fetchSalonById = createAsyncThunk(
  'salon/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await salonService.getSalonById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch salon details');
    }
  }
);

export const salonSlice = createSlice({
  name: 'salon',
  initialState,
  reducers: {
    clearCurrentSalon: (state) => {
      state.currentSalon = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalons.fulfilled, (state, action) => {
        state.loading = false;
        // If action.payload is the array directly:
        state.salons = Array.isArray(action.payload) ? action.payload : action.payload.data || [];
      })
      .addCase(fetchSalons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSalonById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalonById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSalon = action.payload;
      })
      .addCase(fetchSalonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentSalon } = salonSlice.actions;
export default salonSlice.reducer;
