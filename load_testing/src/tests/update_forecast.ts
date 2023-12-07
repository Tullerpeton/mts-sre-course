import { sleep } from 'k6';
import {createForecast} from "../apis/forecast";

export let options = {
    vus: 1,
    stages: [
        { duration: '1m', target: 50 },
        { duration: '1m', target: 100 },
        { duration: '1m', target: 150 },
        { duration: '1m', target: 250 },
        { duration: '1m', target: 500 },
    ],
    thresholds: { http_req_failed: ['rate<0.01'] },
};

export default function test () {
    let min = Math.ceil(100000);
    let max = Math.floor(999999);
    let id = Math.floor(Math.random() * (max - min) + min);

    createForecast({id: id, cityId: 4444, dateTime: 0, temperature: 0, summary: ""});

    // Add some sleep time between iterations
    sleep(1);
}