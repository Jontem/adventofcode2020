import { loadInput } from "../load-input";

console.log(
  loadInput(5).reduce(
    (prev, seat) => Math.max(prev, getRowNumber(seat) * 8 + getColumnId(seat)),
    0
  )
);

function getRowNumber(seat: string): number {
  const rowBinary = seat.substr(0, 7).replace(/F/g, "0").replace(/B/g, "1");
  const rowNumber = parseInt(rowBinary, 2);
  return rowNumber;
}

function getColumnId(seat: string): number {
  const columnBinary = seat
    .substr(seat.length - 3)
    .replace(/L/g, "0")
    .replace(/R/g, "1");
  const column = parseInt(columnBinary, 2);
  return column;
}
