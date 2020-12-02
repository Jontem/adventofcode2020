import { loadInput } from "../load-input";

const input = loadInput(13);
const busses = input[1]
  .split(",")
  .map((c, index) => [index, parseInt(c, 10)])
  .filter(([, bus]) => !Number.isNaN(bus))
  .sort(([, a], [, b]) => b - a);
console.log(busses);
// let timeStamp = 1000000;
let timeStamp = 100000000000000;
let step = 1;
let maxMatches = 0;
while (true) {
  let match = true;
  let currMatches = 0;
  for (const [index, bus] of busses) {
    if ((timeStamp + index) % bus !== 0) {
      match = false;
      break;
    } else {
      currMatches++;
      if (currMatches > maxMatches) {
        step *= bus;
        maxMatches = currMatches;
      }
    }
  }

  if (match) {
    console.log("timestamp: " + timeStamp);
    process.exit(0);
  }

  timeStamp += step;
}
