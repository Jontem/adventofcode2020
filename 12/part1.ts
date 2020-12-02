import { loadInput } from "../load-input";

let direction = "E";
let position: [number, number] = [0, 0];

let letters = ["N", "W", "S", "E"];

for (const r of loadInput(12)) {
  const [, action, numberStr] = /([NSEWLRF])(\d+)/.exec(r)!;
  console.log(action, numberStr);
  switch (action) {
    case "F": {
      const [moveX, moveY] = getVector(direction, parseInt(numberStr, 10));
      position = [position[0] + moveX, position[1] + moveY];
      break;
    }
    case "N":
    case "E":
    case "S":
    case "W": {
      const [moveX, moveY] = getVector(action, parseInt(numberStr, 10));
      position = [position[0] + moveX, position[1] + moveY];
      break;
    }
    case "L":
    case "R": {
      const curDeg = letters.indexOf(direction) * 90;
      const turnDeg = parseInt(numberStr, 10);
      const newDeg = mod(curDeg + (action === "L" ? turnDeg : -turnDeg), 360);
      direction = letters[newDeg / 90];
      if (direction === undefined) {
        throw new Error("Invalid direction: " + newDeg);
      }
      break;
    }
    default: {
      throw new Error(`Unhandled action: ${action}`);
    }
  }
  console.log(direction, position);
}

console.log("Manhattan: ", Math.abs(position[0]) + Math.abs(position[1]));

function getVector(direction: string, steps: number): [number, number] {
  switch (direction) {
    case "N": {
      return [0, -1 * steps];
    }
    case "S": {
      return [0, 1 * steps];
    }
    case "E": {
      return [1 * steps, 0];
    }
    case "W": {
      return [-1 * steps, 0];
    }
    default: {
      throw new Error(`Unhandled direction: ${direction}`);
    }
  }
}

function mod(a: number, b: number) {
  // Calculate
  return ((a % b) + b) % b;
}
