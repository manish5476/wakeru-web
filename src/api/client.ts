export class APIError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  idempotencyKey?: string;
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1';

export async function fetchClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, idempotencyKey, ...customConfig } = options;
  
  // Clean up params
  const url = new URL(API_BASE_URL + endpoint);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const headers = new Headers(customConfig.headers);
  headers.set('Content-Type', 'application/json');
  
  if (idempotencyKey) {
    headers.set('Idempotency-Key', idempotencyKey);
  }

  // Handle Token (mocked for now, integrate with Auth provider)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...customConfig,
    headers,
  };

  const response = await fetch(url.toString(), config);

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }
    throw new APIError(
      response.status,
      errorData.code || 'UNKNOWN_ERROR',
      errorData.message || 'An error occurred during the request.',
      errorData.details
    );
  }

  if (response.status === 204) {
    return {} as T;
  }
  
  return response.json();
}
