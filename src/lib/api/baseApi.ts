const BASE_URL = import.meta.env.VITE_BACKEND_URL || "";
const BACKEND_TOKEN = import.meta.env.VITE_BACKEND_TOKEN || "";
const RAW_AMBIENTE = (import.meta.env.VITE_AMBIENTE || "development").toLowerCase();

const AMBIENTE =
  RAW_AMBIENTE === "staging"
    ? "homologation"
    : RAW_AMBIENTE === "production"
      ? "production"
      : "development";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: HeadersInit;
  signal?: AbortSignal;
}

type RequestConfig = Pick<RequestOptions, "headers" | "signal">;

class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function ensureBaseUrl() {
  if (!BASE_URL) {
    throw new Error(
      "Defina a variavel de ambiente VITE_BACKEND_URL para conectar ao back-end.",
    );
  }

  return BASE_URL.replace(/\/+$/, "");
}

function resolveEndpoint(endpoint: string) {
  return endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
}

function buildHeaders(headers: HeadersInit | undefined, isFormData: boolean) {
  const requestHeaders = new Headers(headers);

  if (!isFormData && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (
    AMBIENTE === "development" &&
    BACKEND_TOKEN &&
    !requestHeaders.has("Authorization")
  ) {
    requestHeaders.set("Authorization", `Bearer ${BACKEND_TOKEN}`);
  }

  return requestHeaders;
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, headers, signal } = options;
  const url = `${ensureBaseUrl()}${resolveEndpoint(endpoint)}`;

  const isFormData = body instanceof FormData;

  const response = await fetch(url, {
    method,
    headers: buildHeaders(headers, isFormData),
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    signal,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : await response.text().catch(() => null);

  if (!response.ok) {
    const message =
      (typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof (data as { message?: unknown }).message === "string" &&
        (data as { message: string }).message) ||
      "Erro na requisicao para o back-end.";

    throw new ApiError(message, response.status, data);
  }

  return data as T;
}

export const api = {
  get: <T>(endpoint: string, config: RequestConfig = {}) =>
    request<T>(endpoint, { method: "GET", ...config }),

  post: <T>(endpoint: string, body?: unknown, config: RequestConfig = {}) =>
    request<T>(endpoint, { method: "POST", body, ...config }),

  put: <T>(endpoint: string, body?: unknown, config: RequestConfig = {}) =>
    request<T>(endpoint, { method: "PUT", body, ...config }),

  patch: <T>(endpoint: string, body?: unknown, config: RequestConfig = {}) =>
    request<T>(endpoint, { method: "PATCH", body, ...config }),

  delete: <T>(endpoint: string, config: RequestConfig = {}) =>
    request<T>(endpoint, { method: "DELETE", ...config }),
};

export { ApiError };
