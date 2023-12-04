// Endpoint that we test against
export const reqResUrl = "http://91.185.85.213";

// Common response type for all requests
export type Response<T> = {
    data: T;
    statusCode: number;
};

// Host header for namespace
export const headerHost = "weather-app.api";

