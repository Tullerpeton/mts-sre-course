import { check } from "k6";
import http from "k6/http";
import { Trend } from "k6/metrics";
import { logWaitingTime } from "../utils/logger";
import {Response, reqResUrl, headerHost} from "./client";

export type City = {
  id: number;
  name: string;
};

// Metrics that we want to track
const metrics = {
  GetCityById: new Trend("get_city_by_id", true),
  UpdateCity: new Trend("update_city", true),
  CreateCity: new Trend("create_city", true),
  GetCities: new Trend("get_cities", true),
};


/**
 * getCityById makes a GET request to the /cities/:id endpoint and asserts
 * that the response is 200 and that the city id and name match the
 * city object that was passed in.
 * @param city
 * @returns Response<City>
 */
export const getCityById = (city: City): Response<City> => {
  const url = reqResUrl;
  const params = {
    headers: {
      'Host': headerHost,
    },
  };

  const res = http.get(`${url}/cities/${city.id}`, params);
  const jsonRes = res.json() as { data: City };
  logWaitingTime({
    metric: metrics.GetCityById,
    response: res,
    messageType: `GetCityById`,
  });

  check(res, {
    "Get City By Id: is 200": (r) => r.status === 200,
  });

  return {
    data: jsonRes.data,
    statusCode: res.status,
  };
};


/**
 * updateCity makes a PUT request to the /cities/:id endpoint and asserts
 * that the response is 200.
 * @param city
 * @returns Response<{}>
 */

export const updateCity = (city: City): Response<{}> => {
  const url = reqResUrl;
  const params = {
    headers: {
      'Host': headerHost,
    },
  };


  const res = http.put(`${url}/cities/${city.id}`, null, params);
  logWaitingTime({
    metric: metrics.UpdateCity,
    response: res,
    messageType: `UpdateCity`,
  });

  check(res, {
    "Update City: is 200": (r) => r.status === 200,
  });

  return {
    data: {},
    statusCode: res.status,
  };
};


/**
 * getCities makes a GET request to the /cities endpoint and asserts
 * that the response is 200.
 * @returns Response<{}>
 */

export const getCities = (): Response<{}> => {
  const url = reqResUrl;
  const params = {
    headers: {
      'Host': headerHost,
    },
  };

  const res = http.get(`${url}/cities`, params);
  logWaitingTime({
    metric: metrics.GetCities,
    response: res,
    messageType: `GetCities`,
  });

  check(res, {
    "Get Cities: is 200": (r) => r.status === 200,
  });

  return {
    data: {},
    statusCode: res.status,
  };
};


/**
 * createCity makes a POST request to the /cities endpoint and asserts
 * that the response is 200 and that the city id match the
 * city object that was passed in.
 * @param city
 * @returns Response<City>
 */

export const createCity = (city: City): Response<City> => {
  const url = reqResUrl;
  const params = {
    headers: {
      'Host': headerHost,
    },
  };

  const res = http.post(`${url}/cities`, null, params);
  const jsonRes = res.json() as { data: City };

  logWaitingTime({
    metric: metrics.CreateCity,
    response: res,
    messageType: `CreateCity`,
  });

  check(res, {
    "Create City: is 200": (r) => r.status === 200,
    "Create City: has correct id": (_) => jsonRes.data.id === city.id,
  });

  return {
    data: jsonRes.data,
    statusCode: res.status,
  };
};
