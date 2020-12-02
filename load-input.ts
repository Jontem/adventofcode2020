import * as fs from "fs";
import * as path from "path";

export function loadInput(day: number): ReadonlyArray<string> {
  return fs
    .readFileSync(path.resolve(__dirname, day + "/input"), "utf-8")
    .split("\n");
}
