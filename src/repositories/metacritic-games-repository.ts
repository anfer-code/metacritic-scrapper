import type { AxiosRequestConfig } from "axios";
import { HttpClient } from "../core/http-client.ts";

export class MetacriticGamesRepository {
  static async execute({
    url,
    headers,
  }: {
    url: string;
    headers?: Record<string, string>;
  }): Promise<string> {
    const defaultHeaders: NonNullable<AxiosRequestConfig["headers"]> = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
      ...headers,
    };

    try {
      const client = new HttpClient({ headers: defaultHeaders });
      const html = await client.get<string>(url);
      return html;
    } catch (error: unknown) {
      console.error("Error al obtener los juegos:", error);
      throw error;
    }
  }
}