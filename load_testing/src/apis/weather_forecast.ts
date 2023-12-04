import {Trend} from "k6/metrics";
import {headerHost, reqResUrl, Response} from "./client";
import http from "k6/http";
import {logWaitingTime} from "../utils/logger";
import {check} from "k6";
import {Forecast} from "./forecast";

export type WeatherForecast = {
    id: number;
    name: string;
    forecast: Forecast[];
};

// Metrics that we want to track
const metrics = {
    GetWeatherForecast: new Trend("get_weather_forecast", true),
};


/**
 * getWeatherForecast makes a GET request to the /weatherForecast endpoint and asserts
 * that the response is 200.
 * @returns Response<{}>
 */
export const getWeatherForecast = (): Response<{}> => {
    const url = reqResUrl;
    const params = {
        headers: {
            'Host': headerHost,
        },
    };

    const res = http.get(`${url}/weatherForecast`, params);
    logWaitingTime({
        metric: metrics.GetWeatherForecast,
        response: res,
        messageType: `GetWeatherForecast`,
    });

    check(res, {
        "Get Weather Forecast: is 200": (r) => r.status === 200,
    });

    return {
        data: {},
        statusCode: res.status,
    };
};
