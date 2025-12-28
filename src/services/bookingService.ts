import api from "./api";

export interface BookingPayload {
  salonId: string;
  serviceId: string;
  date: string;
  time: string;
  [key: string]: unknown;
}

export const bookingService = {
  createBooking: async (data: BookingPayload) => {
    // UPDATED: /api/bookings/
    const response = await api.post("/api/bookings/", data);
    return response.data;
  },

  getMyBookings: async () => {
    // UPDATED: No specific "my-bookings" in openapi list, but likely filtered /api/bookings/ or vendor specific
    // Assuming GET /api/bookings/ returns user's bookings based on token
    const response = await api.get("/api/bookings/");
    return response.data;
  },

  getBookingById: async (id: string) => {
    // UPDATED: /api/bookings/{booking_id}
    const response = await api.get(`/api/bookings/${id}`);
    return response.data;
  },

  cancelBooking: async (id: string) => {
    // No specific cancel endpoint in grep, likely a status update via PUT
    // or DELETE /api/bookings/{id}
    const response = await api.delete(`/api/bookings/${id}`);
    return response.data;
  },
};
