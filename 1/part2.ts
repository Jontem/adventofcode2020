import { loadInput } from "../load-input";

const numbers = loadInput(1).map((n) => parseInt(n, 10));
console.time("olle");
while (numbers.length > 0) {
  const x = numbers.pop();
  const rest = numbers.concat();
  while (rest.length > 0) {
    const y = rest.pop();
    for (const z of rest) {
      if (x! + y! + z === 2020) {
        console.log(x! * y! * z);
        console.timeEnd("olle");
        process.exit();
      }
    }
  }
}
