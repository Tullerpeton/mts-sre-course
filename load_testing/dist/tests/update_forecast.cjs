"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const k6 = require("k6");
const forecast = require("../forecast-obBQiv4-.cjs");
require("k6/http");
require("k6/metrics");
require("../client-g7ZTBkpC.cjs");
let options = {
  vus: 1,
  stages: [
    { duration: "1m", target: 50 },
    { duration: "1m", target: 100 },
    { duration: "1m", target: 150 },
    { duration: "1m", target: 250 },
    { duration: "1m", target: 500 }
  ],
  thresholds: { http_req_failed: ["rate<0.01"] }
};
function test() {
  let min = Math.ceil(1e5);
  let max = Math.floor(999999);
  let id = Math.floor(Math.random() * (max - min) + min);
  forecast.createForecast({ id, cityId: 4444, dateTime: 0, temperature: 0, summary: "" });
  k6.sleep(1);
}
exports.default = test;
exports.options = options;
