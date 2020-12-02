import { loadInput } from "../load-input";

const allNumbers = loadInput(9).map((r) => parseInt(r, 10));
const magicNumber = 731031916;
while (allNumbers.length > 0) {
  let contiguous: Array<number> = [];
  for (const number of allNumbers) {
    contiguous.push(number);
    const currentSum = contiguous.reduce((prev, current) => prev + current, 0);

    if (currentSum > magicNumber) {
      break;
    }

    if (currentSum === magicNumber && contiguous.length > 1) {
      const sorted = contiguous.sort();
      console.log(sorted[0] + sorted[sorted.length - 1]);
      process.exit(0);
    }
  }
  contiguous = [];
  allNumbers.shift();
}
