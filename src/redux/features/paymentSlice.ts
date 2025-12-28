import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { paymentService, InitiatePaymentPayload, VerifyPaymentPayload } from '../../services/paymentService';

interface PaymentState {
  currentPayment: any | null;
  loading: boolean;
  error: string | null;
  paymentUrl: string | null; // For redirecting to payment gateway
  reference: string | null;
}

const initialState: PaymentState = {
  currentPayment: null,
  loading: false,
  error: null,
  paymentUrl: null,
  reference: null,
};

export const initiatePayment = createAsyncThunk(
  'payment/initiate',
  async (data: InitiatePaymentPayload, { rejectWithValue }) => {
    try {
      const response = await paymentService.initiatePayment(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to initiate payment');
    }
  }
);

export const verifyPayment = createAsyncThunk(
  'payment/verify',
  async (data: VerifyPaymentPayload, { rejectWithValue }) => {
    try {
      const response = await paymentService.verifyPayment(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Payment verification failed');
    }
  }
);

export const getPaymentById = createAsyncThunk(
  'payment/getById',
  async (paymentId: string, { rejectWithValue }) => {
    try {
      const response = await paymentService.getPaymentById(paymentId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch payment details');
    }
  }
);

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearPaymentError: (state) => {
      state.error = null;
    },
    resetPaymentState: (state) => {
      state.currentPayment = null;
      state.loading = false;
      state.error = null;
      state.paymentUrl = null;
      state.reference = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Initiate Payment
      .addCase(initiatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming response contains authorization_url and reference (common for Paystack)
        // Adjust based on actual API response
        state.paymentUrl = action.payload.data?.authorization_url || action.payload.authorization_url;
        state.reference = action.payload.data?.reference || action.payload.reference;
        state.currentPayment = action.payload;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Verify Payment
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPayment = action.payload;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get Payment By ID
      .addCase(getPaymentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPayment = action.payload;
      })
      .addCase(getPaymentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPaymentError, resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
