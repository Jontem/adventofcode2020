import { loadInput } from "../load-input";

const input = loadInput(13);
const earliest = parseInt(input[0]);
const busses = input[1]
  .split(",")
  .filter((c) => c !== "x")
  .map((c) => parseInt(c, 10))
  .sort((a, b) => a - b);

const map = new Map<number, number>();
for (const bus of busses) {
  map.set(bus, 0);
}

let timeStamp = 1;
while (true) {
  for (const bus of busses) {
    if (timeStamp % bus === 0) {
      map.set(bus, 0);
      if (timeStamp >= earliest) {
        console.log("bus: " + bus);
        console.log("timestamp: " + timeStamp);
        console.log("answer: " + (timeStamp - earliest) * bus);
        process.exit(0);
      }
    }
  }
  timeStamp++;
}
