import { loadInput } from "../load-input";

const input = loadInput(5);
const rows = new Array(128).fill(0);

for (const seat of input) {
  const rowNumber = getRowNumber(seat);
  const seatId = rowNumber * 8 + getColumnId(seat);
  rows[rowNumber] = (rows[rowNumber] || []).concat(seatId).sort();
}
const allSeats = rows.flatMap((x) => x);
for (const [i, seat] of Array.from(allSeats.entries())) {
  if (allSeats[i + 1] && allSeats[i + 1] - seat === 2) {
    console.log(seat + 1);
  }
}

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
