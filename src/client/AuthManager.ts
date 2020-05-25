import { AxiosInstance } from 'axios';
import { axiosClient } from './axiosClient';
import {
  AuthenticationResponse,
  UserCredentials,
} from '../types/authentication';

interface CacheStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

interface AuthManagerInitialOptions {
  axiosInstance?: AxiosInstance;
  cacheStorage?: CacheStorage;
}

export class AuthError extends Error {}

class AuthManager {
  private readonly tokenKey = 'authToken';
  private readonly authBaseUrl = '/auth';
  private readonly axiosClient: AxiosInstance;
  private readonly cacheStorage: CacheStorage;

  constructor(overrideOptions?: AuthManagerInitialOptions) {
    const { cacheStorage, axiosInstance }: AuthManagerInitialOptions = {
      axiosInstance: axiosClient,
      cacheStorage: localStorage,
      ...overrideOptions,
    };

    this.axiosClient = axiosInstance;
    this.cacheStorage = cacheStorage;
  }

  async authenticate(credentials: UserCredentials) {
    const { data } = await this.axiosClient.post<AuthenticationResponse>(
      this.authBaseUrl,
      credentials,
    );

    return data;
  }

  saveToken(token: string) {
    return this.cacheStorage.setItem(this.tokenKey, token);
  }
}

export const authManager = new AuthManager();

/*

1. request from browser to my server

2. my server responds with client app

3. client app goes to local storage and check for token

4. 1) token is absent -> request to my server with this token -> server authenticates user and responds with data
   2) token isn't absent -> redirect to /login -> user logs in -> server responds with token -> save token

*/
