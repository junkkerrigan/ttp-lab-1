import {
  AuthenticationResponse,
  UserCredentials,
} from '../types/authentication';
import { axiosClient, AxiosClient } from './axiosClient';
import { RegistrationResponse, UserData } from '../types/registration';

interface CacheStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

interface UserManagerInitialOptions {
  axiosClientInstance?: AxiosClient;
  cacheStorage?: CacheStorage;
}

export class RegistrationError extends Error {
  constructor(public badField?: keyof UserData, message?: string) {
    super(message);
  }
}

export class AuthError extends Error {
  constructor(public badField?: keyof UserCredentials) {
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

  setCacheStorage(storage: CacheStorage) {
    this.cacheStorage = storage;
  }

  get isUserAuthenticated() {
    return this.cacheStorage.getItem(this.tokenKey) !== null;
  }

  async register(userData: UserData) {
    try {
      const response = await this.axiosClient.registration.post<
        RegistrationResponse
      >('/', userData);
      const {
        data: { success, data },
      } = response;

      const { token, badFields } = data || {};
      if (!success) {
        if (badFields && badFields.length) {
          badFields.forEach((item) => {
            if (typeof item !== 'string') {
              throw new RegistrationError('email', 'isNotEmail');
            }
            if (item === 'email') {
              throw new RegistrationError('email');
            }
            throw new RegistrationError('username');
          });
        }
        throw new RegistrationError();
      }

      this.axiosClient.updateAuthHeader(token);
      this.token = token!;
    } catch (e) {
      throw e;
    }
  }

  async authenticate(credentials: UserCredentials) {
    const {
      data: { success, data },
    } = await this.axiosClient.auth.post<AuthenticationResponse>(
      '/',
      credentials,
    );

    const { token, badFields } = data || {};
    if (!success) {
      if (badFields?.includes('username')) {
        throw new AuthError('username');
      }
      if (badFields?.includes('password')) {
        throw new AuthError('password');
      }
      throw new AuthError();
    }

    this.axiosClient.updateAuthHeader(token);
    this.token = token!;
  }

  logOut() {
    this.cacheStorage.removeItem(this.tokenKey);
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
