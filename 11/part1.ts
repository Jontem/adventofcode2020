import { loadInput } from "../load-input";

function print(grid: Array<Array<string>>) {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(""));
  }
}

const directions = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
];

const grid: Array<Array<string>> = [];
const input = loadInput(11);

for (let i = 0; i < input.length; i++) {
  const row = input[i].split("");
  grid[i] = [];
  for (let j = 0; j < row.length; j++) {
    grid[i][j] = row[j];
  }
}
let last: string | undefined;
let i = 0;
while (last !== JSON.stringify(grid)) {
  i++;
  last = JSON.stringify(grid);
  const toUpdate: Array<[number, number]> = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const pos = grid[i][j];

      if (pos === ".") {
        continue;
      }
      if (
        pos === "L" &&
        directions.every(([x, y]) => grid[i + y]?.[j + x] !== "#")
      ) {
        toUpdate.push([i, j]);
      } else if (
        pos === "#" &&
        directions.filter(([x, y]) => grid[i + y]?.[j + x] === "#").length >= 4
      ) {
        toUpdate.push([i, j]);
      }
    }
  }

  for (const [i, j] of toUpdate) {
    grid[i][j] = grid[i][j] === "#" ? "L" : "#";
  }
  print(grid);
}

console.log(
  "seats: ",
  grid
    .flatMap((x) => x)
    .join("")
    .replace(/\./g, "")
    .replace(/L/g, "").length
);
