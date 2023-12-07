import {getForecastById, } from "../apis/forecast";
import {cities} from "../data/cities";
import {getCityById} from "../apis/cities";
import {SharedArray} from "k6/data";
import { sleep } from 'k6';

const data = new SharedArray("cities", function () {
  return cities;
});

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
  let min = Math.ceil(0);
  let max = Math.floor(68);
  let num = Math.floor(Math.random() * (max - min) + min);

  const city = data[num];
  getForecastById({id: city.id, cityId: 0, dateTime: 0, temperature: 0, summary: ""});
  getCityById({id: city.id, name: city.city});

  // Add some sleep time between iterations
  sleep(5);
}
