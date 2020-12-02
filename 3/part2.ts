import { loadInput } from "../load-input";

const input = loadInput(3);
let allTrees: Array<number> = [];

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

for (const [right, down] of slopes) {
  let trees = 0;
  let rowIndex = 0;
  let x = 0;
  while (input[rowIndex] !== undefined) {
    const row = input[rowIndex].split("");
    const width = row.length;
    if (rowIndex > 0 && row[x] === "#") {
      trees++;
    }

    const newX = (x + right) % width;
    //   rowIndex = newX < x ? rowIndex + 2 : rowIndex + 1;
    rowIndex = rowIndex + down;
    x = newX;
  }
  allTrees.push(trees);
}

console.log(allTrees.reduce((prev, current) => prev * current, 1));
