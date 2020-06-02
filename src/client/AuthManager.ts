import {
  AuthenticationResponse,
  UserCredentials,
} from '../types/authentication';
import { axiosClient, AxiosClient } from './axiosClient';

interface CacheStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

interface AuthManagerInitialOptions {
  axiosInstance?: AxiosClient;
  cacheStorage?: CacheStorage;
}

export class AuthError extends Error {
  constructor(public incorrectField?: keyof UserCredentials) {
    super();
  }
}

export class AuthManager {
  private readonly tokenKey = 'authToken';
  private readonly authBaseUrl = '/_auth';
  private readonly axiosClient: AxiosClient;
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
    const {
      data: { success, data },
    } = await this.axiosClient.auth.post<AuthenticationResponse>(
      '/',
      credentials,
    );

    const { token, incorrectFields } = data || {};
    if (!success) {
      if (incorrectFields?.includes('username')) {
        throw new AuthError('username');
      }
      if (incorrectFields?.includes('password')) {
        throw new AuthError('password');
      }
      throw new AuthError();
    }

    this.axiosClient.updateDefaults({
      headers: {
        Authorization: token,
      },
    });
    this.saveToken(token!);
  }

  saveToken(token: string) {
    return this.cacheStorage.setItem(this.tokenKey, token);
  }
}

export const authManager = new AuthManager();
