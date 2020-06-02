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

interface UserManagerInitialOptions {
  axiosClientInstance?: AxiosClient;
  cacheStorage?: CacheStorage;
}

export class AuthError extends Error {
  constructor(public incorrectField?: keyof UserCredentials) {
    super();
  }
}

export class UserManager {
  private readonly tokenKey = 'authToken';
  private readonly axiosClient: AxiosClient;
  private cacheStorage: CacheStorage;

  constructor(overrideOptions?: UserManagerInitialOptions) {
    const { cacheStorage, axiosClientInstance }: UserManagerInitialOptions = {
      axiosClientInstance: axiosClient,
      cacheStorage: localStorage,
      ...overrideOptions,
    };

    this.axiosClient = axiosClientInstance;
    this.cacheStorage = cacheStorage;
  }

  get isUserAuthenticated() {
    return this.cacheStorage.getItem(this.tokenKey) !== null;
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

    this.axiosClient.updateAuthHeader(token);
    this.token = token!;
  }

  get token() {
    return this.cacheStorage.getItem(this.tokenKey);
  }

  set token(token: any) {
    if (token) {
      this.cacheStorage.setItem(this.tokenKey, String(token));
    }
  }
}

export const userManager = new UserManager();
