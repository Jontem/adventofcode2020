import { loadInput } from "../load-input";

function print(grid: Array<Array<string>>) {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(""));
  }
}

const directions: ReadonlyArray<[number, number]> = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
];

function walk(
  grid: Array<Array<string>>,
  start: [number, number],
  direction: [number, number]
): string | undefined {
  let [i, j] = start;
  const [x, y] = direction;
  i += y;
  j += x;
  while (grid[i]?.[j] !== undefined) {
    // console.log(start);
    if (grid[i][j] === "#" || grid[i][j] === "L") {
      return grid[i][j];
    }
    i += y;
    j += x;
  }
}

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
        directions.every((direction) => walk(grid, [i, j], direction) !== "#")
      ) {
        toUpdate.push([i, j]);
      } else if (
        pos === "#" &&
        directions.filter((direction) => walk(grid, [i, j], direction) === "#")
          .length >= 5
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
