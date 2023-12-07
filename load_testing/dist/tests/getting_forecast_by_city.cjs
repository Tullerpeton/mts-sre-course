"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const forecast = require("../forecast-obBQiv4-.cjs");
const k6 = require("k6");
const http = require("k6/http");
const metrics$1 = require("k6/metrics");
const client = require("../client-g7ZTBkpC.cjs");
const data$1 = require("k6/data");
const cities = [
  {
    id: 2,
    city: "New Natasha"
  },
  {
    id: 3,
    city: "Tammytown"
  },
  {
    id: 4,
    city: "Valenciastad"
  },
  {
    id: 5,
    city: "New Zachary"
  },
  {
    id: 6,
    city: "East Kristyton"
  },
  {
    id: 7,
    city: "North Mary"
  },
  {
    id: 8,
    city: "Donaldbury"
  },
  {
    id: 9,
    city: "Christiantown"
  },
  {
    id: 10,
    city: "Lake Heather"
  },
  {
    id: 11,
    city: "West Georgefurt"
  },
  {
    id: 12,
    city: "West Brianmouth"
  },
  {
    id: 13,
    city: "East David"
  },
  {
    id: 14,
    city: "Port Sharonstad"
  },
  {
    id: 15,
    city: "West Lorifort"
  },
  {
    id: 16,
    city: "Port Christineborough"
  },
  {
    id: 17,
    city: "East Brookestad"
  },
  {
    id: 18,
    city: "Port Jeffrey"
  },
  {
    id: 19,
    city: "Bellville"
  },
  {
    id: 20,
    city: "Davidtown"
  },
  {
    id: 21,
    city: "Davismouth"
  },
  {
    id: 22,
    city: "Armstrongmouth"
  },
  {
    id: 23,
    city: "Heathertown"
  },
  {
    id: 24,
    city: "West Sara"
  },
  {
    id: 25,
    city: "Greenehaven"
  },
  {
    id: 26,
    city: "Englishville"
  },
  {
    id: 27,
    city: "New Alexa"
  },
  {
    id: 28,
    city: "Kathrynport"
  },
  {
    id: 29,
    city: "South Alan"
  },
  {
    id: 30,
    city: "Carterstad"
  },
  {
    id: 31,
    city: "Lake Jenniferbury"
  },
  {
    id: 32,
    city: "West Tiffanystad"
  },
  {
    id: 33,
    city: "Phillipsville"
  },
  {
    id: 34,
    city: "Lake Jamesfort"
  },
  {
    id: 35,
    city: "Woodshire"
  },
  {
    id: 36,
    city: "Port Danielleborough"
  },
  {
    id: 37,
    city: "Jasonside"
  },
  {
    id: 38,
    city: "Heatherbury"
  },
  {
    id: 39,
    city: "West Elizabethburgh"
  },
  {
    id: 40,
    city: "East Amberberg"
  },
  {
    id: 41,
    city: "West Jerryfort"
  },
  {
    id: 42,
    city: "Maybury"
  },
  {
    id: 43,
    city: "Lake Kyle"
  },
  {
    id: 44,
    city: "East Christine"
  },
  {
    id: 45,
    city: "North Rebeccaview"
  },
  {
    id: 46,
    city: "Mayburgh"
  },
  {
    id: 47,
    city: "North Michaelmouth"
  },
  {
    id: 48,
    city: "Ericberg"
  },
  {
    id: 49,
    city: "South Katherinefort"
  },
  {
    id: 50,
    city: "New Rebeccaborough"
  },
  {
    id: 51,
    city: "Bauermouth"
  },
  {
    id: 52,
    city: "Markmouth"
  },
  {
    id: 53,
    city: "South Elizabeth"
  },
  {
    id: 54,
    city: "East Steven"
  },
  {
    id: 55,
    city: "Lake James"
  },
  {
    id: 56,
    city: "Sullivanborough"
  },
  {
    id: 57,
    city: "Andrewhaven"
  },
  {
    id: 58,
    city: "Rebekahland"
  },
  {
    id: 59,
    city: "Timmouth"
  },
  {
    id: 60,
    city: "Littlemouth"
  },
  {
    id: 61,
    city: "Lake Sandramouth"
  },
  {
    id: 62,
    city: "Royland"
  },
  {
    id: 63,
    city: "Shellyborough"
  },
  {
    id: 64,
    city: "East Rachel"
  },
  {
    id: 65,
    city: "West Shawn"
  },
  {
    id: 66,
    city: "West Lawrenceberg"
  },
  {
    id: 67,
    city: "Collierstad"
  },
  {
    id: 68,
    city: "Smithside"
  },
  {
    id: 69,
    city: "Johnmouth"
  },
  {
    id: 70,
    city: "Ramirezland"
  }
];
const metrics = {
  GetCityById: new metrics$1.Trend("get_city_by_id", true),
  UpdateCity: new metrics$1.Trend("update_city", true),
  CreateCity: new metrics$1.Trend("create_city", true),
  GetCities: new metrics$1.Trend("get_cities", true)
};
const getCityById = (city) => {
  const url = client.reqResUrl;
  const params = {
    headers: {
      "Host": client.headerHost
    }
  };
  const res = http.get(`${url}/cities/${city.id}`, params);
  const jsonRes = res.json();
  client.logWaitingTime({
    metric: metrics.GetCityById,
    response: res,
    messageType: `GetCityById`
  });
  k6.check(res, {
    "Get City By Id: is 200": (r) => r.status === 200
  });
  return {
    data: jsonRes.data,
    statusCode: res.status
  };
};
const data = new data$1.SharedArray("cities", function() {
  return cities;
});
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
  let min = Math.ceil(0);
  let max = Math.floor(68);
  let num = Math.floor(Math.random() * (max - min) + min);
  const city = data[num];
  forecast.getForecastById({ id: city.id, cityId: 0, dateTime: 0, temperature: 0, summary: "" });
  getCityById({ id: city.id, name: city.city });
  k6.sleep(5);
}
exports.default = test;
exports.options = options;
