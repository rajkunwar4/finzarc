export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ErrorResponse {
  success: false;
  message: string;
}

export interface SuccessResponse<T> {
  success: true;
  message?: string;
  data: T;
}
