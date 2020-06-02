import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  API_BASE_URL,
  AUTH_BASE_URL,
  AUTHORIZATION_HEADER_NAME,
} from './constants';

type AxiosClientInstanceNames = 'api' | 'auth' | 'default';

type AxiosClientInstances = Record<AxiosClientInstanceNames, AxiosInstance>;

export interface AxiosClient extends AxiosInstance {
  api: AxiosInstance;
  auth: AxiosInstance;
  updateDefaults(
    overrideDefaults: AxiosRequestConfig,
    forInstances?: Record<Partial<AxiosClientInstanceNames>, boolean>,
  ): void;
  updateAuthHeader(name?: string): void;
}

export const createAxiosClient = (
  apiBaseUrl: string = API_BASE_URL,
  authBaseUrl: string = AUTH_BASE_URL,
): AxiosClient => {
  const axiosForApi = axios.create({
    baseURL: apiBaseUrl,
  });
  const axiosForAuth = axios.create({
    baseURL: authBaseUrl,
  });

  const defaultInstance: any = axios.create();
  defaultInstance.api = axiosForApi;
  defaultInstance.auth = axiosForAuth;

  const instances: AxiosClientInstances = {
    api: axiosForApi,
    auth: axiosForAuth,
    default: defaultInstance,
  };

  const iterateThroughInstances = (
    instanceNames: AxiosClientInstanceNames[],
  ) => (functionToApply: (instance: AxiosInstance) => any) => {
    instanceNames.forEach((name) => {
      functionToApply(instances[name]);
    });
  };

  defaultInstance.updateDefaults = (
    defaultsUpdatingFn: (currentDefaults: AxiosRequestConfig) => void,
    forInstances?: Record<Partial<AxiosClientInstanceNames>, boolean>,
  ) => {
    let instanceNames = Object.keys(instances);
    if (forInstances) {
      instanceNames = Object.keys(forInstances);
    }

    iterateThroughInstances(instanceNames as AxiosClientInstanceNames[])(
      (instance) => {
        defaultsUpdatingFn(instance.defaults);
      },
    );
  };

  defaultInstance.updateAuthHeader = (
    value: string,
    name: string = AUTHORIZATION_HEADER_NAME,
  ) => {
    defaultInstance.updateDefaults((currentDefaults: AxiosRequestConfig) => {
      currentDefaults.headers.common[name] = value;
    });
  };

  return defaultInstance;
};

export const axiosClient = createAxiosClient();
