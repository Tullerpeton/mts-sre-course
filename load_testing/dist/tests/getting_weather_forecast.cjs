"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const metrics$1 = require("k6/metrics");
const client = require("../client-g7ZTBkpC.cjs");
const http = require("k6/http");
const k6 = require("k6");
const metrics = {
  GetWeatherForecast: new metrics$1.Trend("get_weather_forecast", true)
};
const getWeatherForecast = () => {
  const url = client.reqResUrl;
  const params = {
    headers: {
      "Host": client.headerHost
    }
  };
  const res = http.get(`${url}/weatherForecast`, params);
  client.logWaitingTime({
    metric: metrics.GetWeatherForecast,
    response: res,
    messageType: `GetWeatherForecast`
  });
  k6.check(res, {
    "Get Weather Forecast: is 200": (r) => r.status === 200
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
  ],
  thresholds: { http_req_failed: ["rate<0.01"] }
};
function test() {
  getWeatherForecast();
  k6.sleep(5);
}
exports.default = test;
exports.options = options;
