/* eslint-disable */
import response1 from './workday-mock/response-1.json';
import response2 from './workday-mock/response-2.json';
import response3 from './workday-mock/response-3.json';
import response4 from './workday-mock/response-4.json';
import response5 from './workday-mock/response-5.json';
import response6 from './workday-mock/response-6.json';
import response7 from './workday-mock/response-7.json';
import results from './workday-mock/results.json';


export const input = [
  [JSON.stringify(response1), { status: 200 }],
  [JSON.stringify(response2), { status: 200 }],
  [JSON.stringify(response3), { status: 200 }],
  [JSON.stringify(response4), { status: 200 }],
  [JSON.stringify(response5), { status: 200 }],
  [JSON.stringify(response6), { status: 200 }],
  [JSON.stringify(response7), { status: 200 }],
  ["", { status: 404 }],
];
export const output = results;
