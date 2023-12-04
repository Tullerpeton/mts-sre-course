"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const k6 = require("k6");
const http = require("k6/http");
const metrics$2 = require("k6/metrics");
const getTimestamp = () => {
  const date = /* @__PURE__ */ new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const milliseconds = date.getMilliseconds().toString().padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};
const logger = {
  info(...val) {
    console.log(getTimestamp(), ...val);
  },
  warn(...val) {
    console.warn(getTimestamp(), ...val);
  },
  error(...val) {
    console.error(getTimestamp(), ...val);
  }
};
const logWaitingTime = ({
  metric,
  response,
  messageType
}) => {
  const responseTimeThreshold = 5e3;
  let correlationId = "";
  let responseTime = response.timings.waiting;
  try {
    let json = response.json();
    correlationId = json.correlationId;
  } catch (err) {
  }
  if (responseTime > responseTimeThreshold) {
    logger.warn(
      `${messageType} with correlationId '${correlationId}' took longer than ${responseTimeThreshold}`
    );
  }
  metric.add(responseTime);
};
const reqResUrl = "http://91.185.85.213";
const headerHost = "weather-app.api";
const metrics$1 = {
  GetCityById: new metrics$2.Trend("get_city_by_id", true),
  UpdateCity: new metrics$2.Trend("update_city", true),
  CreateCity: new metrics$2.Trend("create_city", true),
  GetCities: new metrics$2.Trend("get_cities", true)
};
const getCities = () => {
  const url = reqResUrl;
  const params = {
    headers: {
      "Host": headerHost
    }
  };
  const res = http.get(`${url}/cities`, params);
  logWaitingTime({
    metric: metrics$1.GetCities,
    response: res,
    messageType: `GetCities`
  });
  k6.check(res, {
    "Get Cities: is 200": (r) => r.status === 200
  });
  return {
    data: {},
    statusCode: res.status
  };
};
const metrics = {
  GetForecastById: new metrics$2.Trend("get_forecast_by_id", true),
  UpdateForecast: new metrics$2.Trend("update_forecast", true),
  CreateForecast: new metrics$2.Trend("create_forecast", true),
  GetForecasts: new metrics$2.Trend("get_forecasts", true)
};
const getForecasts = () => {
  const url = reqResUrl;
  const params = {
    headers: {
      "Host": headerHost
    }
  };
  const res = http.get(`${url}/forecast`, params);
  logWaitingTime({
    metric: metrics.GetForecasts,
    response: res,
    messageType: `GetForecasts`
  });
  k6.check(res, {
    "Get Forecasts: is 200": (r) => r.status === 200
  });
  return {
    data: {},
    statusCode: res.status
  };
};
let options = {
  vus: 1,
  stages: [
    { duration: "2m", target: 50 },
    { duration: "2m", target: 100 },
    { duration: "2m", target: 150 },
    { duration: "2m", target: 250 },
    { duration: "2m", target: 500 },
    { duration: "2m", target: 700 },
    { duration: "2m", target: 900 },
    { duration: "2m", target: 1e3 }
  ]
};
function test() {
  logger.info(
    `Running iteration`
  );
  getCities();
  getForecasts();
}
exports.default = test;
exports.options = options;
