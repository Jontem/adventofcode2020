import { loadInput } from "../load-input";

let direction = "E";
let position: [number, number] = [0, 0];
let wpPosition: [number, number] = [10, -1];

for (const r of loadInput(12)) {
  const [, action, numberStr] = /([NSEWLRF])(\d+)/.exec(r)!;
  console.log(action, numberStr);
  switch (action) {
    case "F": {
      const multiplier = parseInt(numberStr, 10);
      const wpDiff = [wpPosition[0] - position[0], wpPosition[1] - position[1]];
      position = [
        position[0] + multiplier * (wpPosition[0] - position[0]),
        position[1] + multiplier * (wpPosition[1] - position[1]),
      ];
      wpPosition = [position[0] + wpDiff[0], position[1] + wpDiff[1]];
      break;
    }
    case "N":
    case "E":
    case "S":
    case "W": {
      const [moveX, moveY] = getVector(action, parseInt(numberStr, 10));
      wpPosition = [wpPosition[0] + moveX, wpPosition[1] + moveY];
      break;
    }
    case "L":
    case "R": {
      const turnDeg = parseInt(numberStr, 10);

      const multiplier = turnDeg / 90;

      for (let i = 1; i <= multiplier; i++) {
        const [currX, currY] = [
          wpPosition[0] - position[0],
          wpPosition[1] - position[1],
        ];
        switch (action) {
          case "R": {
            wpPosition = [-currY + position[0], currX + position[1]];
            break;
          }
          case "L": {
            wpPosition = [currY + position[0], -currX + position[1]];
            break;
          }
          default: {
            throw new Error("Unhandled rotation");
          }
        }
      }
      break;
    }
    default: {
      throw new Error(`Unhandled action: ${action}`);
    }
  }
  console.log("ship:", direction, position);
  console.log("wp:", wpPosition);
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
