import api from "./api";

export interface InitiatePaymentPayload {
  bookingId: string;
  amount: number;
  email: string;
  [key: string]: any;
}

export interface VerifyPaymentPayload {
  reference: string;
  [key: string]: any;
}

export const paymentService = {
  initiatePayment: async (data: InitiatePaymentPayload) => {
    const response = await api.post("/api/payments/initiate", data);
    return response.data;
  },

  verifyPayment: async (data: VerifyPaymentPayload) => {
    const response = await api.post("/api/payments/verify", data);
    return response.data;
  },

  getPaymentById: async (paymentId: string) => {
    const response = await api.get(`/api/payments/${paymentId}`);
    return response.data;
  },

  // Dev/Test endpoints
  testWebhookConnection: async () => {
    const response = await api.get("/api/payments/webhook/test-connection");
    return response.data;
  },

  createTestPayment: async () => {
    const response = await api.get("/api/payments/webhook/create-test-payment");
    return response.data;
  },
};
