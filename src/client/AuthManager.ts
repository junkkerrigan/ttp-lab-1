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
    // const token = this.getToken();
    // if (!token) {
    //     throw new AuthError('Failed to authenticate: no valid token in cache storage found');
    // }

    const { data: responseData } = await this.axiosClient.get<
      AuthenticationResponse
    >(this.authBaseUrl);
    const {
      success,
      data: { token, message },
    } = responseData;
  }

  getToken() {
    return this.cacheStorage.getItem(this.tokenKey);
  }
}

export const authService = new AuthManager();

/*

1. request from browser to my server

2. my server responds with client app

3. client app goes to local storage and check for token

4. 1) token is absent -> request to my server with this token -> server authenticates user and responds with data
   2) token isn't absent -> redirect to /login -> user logs in -> server responds with token -> save token

*/
