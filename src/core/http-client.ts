import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface HttpClientOptions {
  baseURL?: string;
  headers?: AxiosRequestConfig["headers"];
}

export class HttpClient {
  readonly client: AxiosInstance;

  constructor(options: HttpClientOptions = {}) {
    this.client = axios.create({
      ...(options.baseURL ? { baseURL: options.baseURL } : {}),
      ...(options.headers ? { headers: options.headers } : {}),
    });
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.request<T>(config);
    return response.data;
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({
      ...config,
      method: "GET",
      url,
    });
  }
}
