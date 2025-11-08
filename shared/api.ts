/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Form submission types
 */
export interface NewsletterSignupRequest {
  email: string;
}

export interface NewsletterSignupResponse {
  message: string;
  email: string;
}

export interface ContactFormRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactFormResponse {
  message: string;
  data: {
    name: string;
    email: string;
    subject?: string;
  };
}

export interface LoginAttemptRequest {
  email: string;
}

export interface LoginAttemptResponse {
  message: string;
}

export interface RegistrationRequest {
  firstName: string;
  lastName: string;
  email: string;
}

export interface RegistrationResponse {
  message: string;
  data: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface OrderPlacementRequest {
  shippingInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address: string;
    city: string;
    country: string;
    postalCode?: string;
  };
  cartItems: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    weight: string;
  }>;
  paymentMethod: string;
  orderTotal: number;
  subtotal: number;
  shipping: number;
  tax: number;
}

export interface OrderPlacementResponse {
  message: string;
  orderId: string;
}

export interface ApiError {
  error: string;
}
