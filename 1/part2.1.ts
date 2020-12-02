import { loadInput } from "../load-input";

const numbers = loadInput(1).map((n) => parseInt(n, 10));
console.time("olle");

const map = new Map<number, [number, number]>();
for (let i = 0; i < numbers.length; i++) {
  const x = numbers[i];
  for (const y of numbers) {
    if (y !== undefined && x !== y && x + y <= 2020) {
      map.set(x + y, [x, y]);
    }
  }
}

for (const z of numbers) {
  const maybe = map.get(2020 - z);
  if (maybe && maybe.indexOf(z) === -1) {
    console.log(z * maybe[0] * maybe[1]);
    console.timeEnd("olle");
    break;
  }
}
