import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_BASE_URL, AUTH_BASE_URL } from './constants';

type AxiosClientInstanceNames = 'api' | 'auth' | 'default';

type AxiosClientInstances = Record<AxiosClientInstanceNames, AxiosInstance>;

export interface AxiosClient extends AxiosInstance {
  api: AxiosInstance;
  auth: AxiosInstance;
  updateDefaults(
    overrideDefaults: AxiosRequestConfig,
    forInstances?: Record<Partial<AxiosClientInstanceNames>, boolean>,
  ): void;
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

  defaultInstance.updateDefaults = (
    overrideDefaults: AxiosRequestConfig,
    forInstances?: Record<Partial<AxiosClientInstanceNames>, boolean>,
  ) => {
    if (!forInstances) {
      (Object.values(instances) as AxiosInstance[]).forEach((instance) => {
        instance.defaults = {
          ...instance.defaults,
          ...overrideDefaults,
        };
      });
    } else {
      (Object.keys(forInstances) as AxiosClientInstanceNames[]).forEach(
        (instanceName) => {
          instances[instanceName].defaults = {
            ...instances[instanceName].defaults,
            ...overrideDefaults,
          };
        },
      );
    }
  };

  return defaultInstance;
};

export const axiosClient = createAxiosClient();
