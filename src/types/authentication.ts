export interface UserCredentials {
    username: string;
    password: string;
}

export interface AuthenticationRequest extends UserCredentials {}

export interface AuthenticationResponse {
    success: boolean;
    token?: string;
    message?: string;
}