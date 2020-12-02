import { loadInput } from "../load-input";

const allNumbers = loadInput(9).map((r) => parseInt(r, 10));
const magicNumber = 25;
for (const [index, number] of Array.from(
  allNumbers.slice(magicNumber).entries()
)) {
  const prev25 = allNumbers.slice(index, index + magicNumber);

  let match: boolean = false;
  for (const possible of prev25)
    for (const possible2 of prev25.filter((p2) => p2 !== possible)) {
      if (possible + possible2 === number) {
        match = true;
      }
    }
  if (!match) {
    console.log(prev25);
    console.log(number);
    break;
  }
}
