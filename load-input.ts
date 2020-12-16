import * as fs from "fs";
import * as path from "path";

export function loadInput(day: number): ReadonlyArray<string> {
  return loadInputWithOutSplit(day).split("\n");
}

export function loadInputWithOutSplit(day: number): string {
  return fs.readFileSync(path.resolve(__dirname, day + "/input"), "utf-8");
}
