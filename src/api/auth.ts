import { fetchClient } from './client';

export const authApi = {
  login: async (email: string, firebaseToken: string) => {
    // Standard flow in this architecture passes a Firebase token to backend for JWT exchange
    // or standard email/password depending on the backend endpoint.
    // Assuming a standard email payload for this Next.js abstraction
    return fetchClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, firebaseToken })
    });
  }
};
