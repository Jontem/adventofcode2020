import { loadInput } from "../load-input";

const sortedAdapters = loadInput(10)
  .map((r) => parseInt(r, 10))
  .sort((a, b) => a - b);

let lastAdapter = 0;
let diff1 = 0;
let diff3 = 0;
for (const adapter of sortedAdapters.concat(
  sortedAdapters[sortedAdapters.length - 1] + 3
)) {
  const diff = adapter - lastAdapter;
  if (diff === 1) {
    diff1++;
  } else if (diff === 3) {
    diff3++;
  }

  lastAdapter = adapter;
}

console.log(diff1 * diff3);
