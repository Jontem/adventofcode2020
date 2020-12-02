import { loadInput } from "../load-input";

const numbers = new Set<number>();
for (const numberStr of loadInput(1)) {
  const n = parseInt(numberStr);
  const x = 2020 - n;

  if (numbers.has(x)) {
    console.log(x * n);
    break;
  }
  numbers.add(n);
}
