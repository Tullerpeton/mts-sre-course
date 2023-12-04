// import { SharedArray } from "k6/data";
// import { cities } from "../data/cities";
import { logger } from "../utils/logger";
import {getCities} from "../apis/cities";
import {getForecasts} from "../apis/forecast";

// const data = new SharedArray("users", function () {
//   return cities;
// });

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
};

export default function test () {
  // Get a random user from data that isn't currently being tested
  // const city = data[vu.idInTest - 1];

  logger.info(
    `Running iteration`
  );

  getCities();
  getForecasts();
}
