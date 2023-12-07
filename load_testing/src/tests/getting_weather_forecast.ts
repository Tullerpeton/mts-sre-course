import {getWeatherForecast} from "../apis/weather_forecast";

export let options = {
  vus: 1,
  stages: [
    { duration: '2m', target: 50 },
    { duration: '2m', target: 100 },
    { duration: '2m', target: 150 },
    { duration: '2m', target: 250 },
    { duration: '2m', target: 500 },
    { duration: '2m', target: 700 },
    { duration: '2m', target: 900 },
    { duration: '2m', target: 1000 },
  ],
  thresholds: { http_req_failed: ['rate<0.01'] },
};

export default function test () {
  getWeatherForecast();
}
