"use strict";
const k6 = require("k6");
const http = require("k6/http");
const metrics$1 = require("k6/metrics");
const client = require("./client-g7ZTBkpC.cjs");
const metrics = {
  GetForecastById: new metrics$1.Trend("get_forecast_by_id", true),
  UpdateForecast: new metrics$1.Trend("update_forecast", true),
  CreateForecast: new metrics$1.Trend("create_forecast", true),
  GetForecasts: new metrics$1.Trend("get_forecasts", true)
};
const getForecastById = (forecast) => {
  const url = client.reqResUrl;
  const params = {
    headers: {
      "Host": client.headerHost
    }
  };
  const res = http.get(`${url}/forecast/${forecast.id}`, params);
  const jsonRes = res.json();
  client.logWaitingTime({
    metric: metrics.GetForecastById,
    response: res,
    messageType: `GetForecastById`
  });
  k6.check(res, {
    "Get Forecast By Id: is 200": (r) => r.status === 200
  });
  return {
    data: jsonRes.data,
    statusCode: res.status
  };
};
const createForecast = (forecast) => {
  const url = client.reqResUrl;
  const params = {
    headers: {
      "Host": client.headerHost
    }
  };
  const res = http.post(`${url}/forecast`, null, params);
  const jsonRes = res.json();
  client.logWaitingTime({
    metric: metrics.CreateForecast,
    response: res,
    messageType: `CreateForecast`
  });
  k6.check(res, {
    "Create Forecast: is 200": (r) => r.status === 200,
    "Create Forecast: has correct id": (_) => jsonRes.data.id === forecast.id
  });
  return {
    data: jsonRes.data,
    statusCode: res.status
  };
};
exports.createForecast = createForecast;
exports.getForecastById = getForecastById;
