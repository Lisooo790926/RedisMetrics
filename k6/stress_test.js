import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 1000 }, // warm up
    { duration: "10m", target: 1000 },  // stable
    { duration: "30s", target: 0 },  // cool down
  ],
};

const BASE_URL = "http://localhost:3001"; // Replace with your server's URL
const KEY_PREFIX = "testKey_";

export default function stableGetSet() {
  let key = KEY_PREFIX + __VU + "_" + __ITER;
  let value = "testValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuetestValuev";

  // Test the SET endpoint
  let setResponse = http.post(
    `${BASE_URL}/set`,
    JSON.stringify({ key: key, value: value }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  check(setResponse, { "status was 200 for set": (r) => r.status === 200 });

  // sleep(1); // Wait 1 second between requests

  // Test the GET endpoint
  let getResponse = http.get(`${BASE_URL}/get/${key}`);
  check(getResponse, { "status was 200 for get": (r) => r.status === 200 });
}
