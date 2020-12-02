import { loadInput } from "../load-input";

const input = loadInput(3);

let rowIndex = 0;
let x = 0;
let trees = 0;
while (input[rowIndex] !== undefined) {
  const row = input[rowIndex].split("");
  const width = row.length;
  if (rowIndex > 0 && row[x] === "#") {
    trees++;
  }

  const newX = (x + 3) % width;
  //   rowIndex = newX < x ? rowIndex + 2 : rowIndex + 1;
  rowIndex++;
  x = newX;
}

console.log(trees);
