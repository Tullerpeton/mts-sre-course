import { check } from "k6";
import http from "k6/http";
import { Trend } from "k6/metrics";
import { logWaitingTime } from "../utils/logger";
import {Response, reqResUrl, headerHost} from "./client";

export type Forecast = {
    id: number;
    cityId: number;
    dateTime: number;
    temperature: number;
    summary: string;
};

// Metrics that we want to track
const metrics = {
    GetForecastById: new Trend("get_forecast_by_id", true),
    UpdateForecast: new Trend("update_forecast", true),
    CreateForecast: new Trend("create_forecast", true),
    GetForecasts: new Trend("get_forecasts", true),
};


/**
 * getForecastById makes a GET request to the /forecast/:id endpoint and asserts
 * that the response is 200 and that the forecast id match the
 * forecast object that was passed in.
 * @param forecast
 * @returns Response<Forecast>
 */
export const getForecastById = (forecast: Forecast): Response<Forecast> => {
    const url = reqResUrl;
    const params = {
        headers: {
            'Host': headerHost,
        },
    };

    const res = http.get(`${url}/forecast/${forecast.id}`, params);
    const jsonRes = res.json() as { data: Forecast };
    logWaitingTime({
        metric: metrics.GetForecastById,
        response: res,
        messageType: `GetForecastById`,
    });

    check(res, {
        "Get Forecast By Id: is 200": (r) => r.status === 200,
        "Get Forecast By Id: has correct id": (_) => jsonRes.data.id === forecast.id,
    });

    return {
        data: jsonRes.data,
        statusCode: res.status,
    };
};


/**
 * updateForecast makes a PUT request to the /forecast/:id endpoint and asserts
 * that the response is 200.
 * @param forecast
 * @returns Response<{}>
 */

export const updateForecast = (forecast: Forecast): Response<{}> => {
    const url = reqResUrl;
    const params = {
        headers: {
            'Host': headerHost,
        },
    };


    const res = http.put(`${url}/forecast/${forecast.id}`, null, params);
    logWaitingTime({
        metric: metrics.UpdateForecast,
        response: res,
        messageType: `UpdateForecast`,
    });

    check(res, {
        "Update Forecast: is 200": (r) => r.status === 200,
    });

    return {
        data: {},
        statusCode: res.status,
    };
};


/**
 * getForecasts makes a GET request to the /forecast endpoint and asserts
 * that the response is 200.
 * @returns Response<{}>
 */

export const getForecasts = (): Response<{}> => {
    const url = reqResUrl;
    const params = {
        headers: {
            'Host': headerHost,
        },
    };

    const res = http.get(`${url}/forecast`, params);
    logWaitingTime({
        metric: metrics.GetForecasts,
        response: res,
        messageType: `GetForecasts`,
    });

    check(res, {
        "Get Forecasts: is 200": (r) => r.status === 200,
    });

    return {
        data: {},
        statusCode: res.status,
    };
};


/**
 * createForecast makes a POST request to the /forecast endpoint and asserts
 * that the response is 200 and that the forecast id match the
 * forecast object that was passed in.
 * @param forecast
 * @returns Response<Forecast>
 */

export const createForecast = (forecast: Forecast): Response<Forecast> => {
    const url = reqResUrl;
    const params = {
        headers: {
            'Host': headerHost,
        },
    };

    const res = http.post(`${url}/forecast`, null, params);
    const jsonRes = res.json() as { data: Forecast };

    logWaitingTime({
        metric: metrics.CreateForecast,
        response: res,
        messageType: `CreateForecast`,
    });

    check(res, {
        "Create Forecast: is 200": (r) => r.status === 200,
        "Create Forecast: has correct id": (_) => jsonRes.data.id === forecast.id,
    });

    return {
        data: jsonRes.data,
        statusCode: res.status,
    };
};
