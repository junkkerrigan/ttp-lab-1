export interface UserData {
  name?: string;
  email: string;
  username: string;
  password: string;
}

export interface RegistrationRequest extends UserData {}

export interface RegistrationResponse {
  success: boolean;
  data?: {
    token?: string;
    badFields?: (keyof UserData | { name: keyof UserData; message: string })[];
  };
}
