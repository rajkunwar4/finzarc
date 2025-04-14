export interface User {
    id: string;
    email: string;
    name: string;
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface RegisterData {
    email: string;
    password: string;
    name: string;
  }
  
  export interface AuthResponse {
    user: User;
    token?: string; // Assuming you return a token upon successful login/registration
  }