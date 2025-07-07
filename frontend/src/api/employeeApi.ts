import axios from "axios";

const API_BASE = "http://localhost:5001/api";

export const getUsers = () => axios.get(`${API_BASE}/users`);
export const getUserTickets = (userId: number) =>
  axios.get(`${API_BASE}/users/${userId}/tickets`);

export const startTicket = (ticketId: number) =>
  axios.post(`${API_BASE}/tickets/${ticketId}/start`);

export const pauseTicket = (ticketId: number) =>
  axios.post(`${API_BASE}/tickets/${ticketId}/pause`);

export const resumeTicket = (ticketId: number) =>
  axios.post(`${API_BASE}/tickets/${ticketId}/resume`);

export const completeTicket = (ticketId: number) =>
  axios.post(`${API_BASE}/tickets/${ticketId}/complete`);
