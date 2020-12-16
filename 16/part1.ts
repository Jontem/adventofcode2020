import { loadInputWithOutSplit } from "../load-input";

const input = loadInputWithOutSplit(16);

const sections = input.split("\n\n");
const rules = sections[0]
  .split("\n")
  .map((r) => {
    const rules = r.replace(/\w+?: /, "").split(" or ");
    return rules;
  })
  .flatMap((x) => x);

const fields = sections[2]
  .replace("nearby tickets:\n", "")
  .split("\n")
  .map((r) => r.split(",").map((f) => parseInt(f, 10)))
  .flatMap((x) => x);

const validFields: Set<number> = new Set();
for (const field of fields) {
  for (const rule of rules) {
    const [low, high] = rule.split("-").map((n) => parseInt(n, 10));
    if (field >= low && field <= high) {
      validFields.add(field);
    }
  }
}
console.log(
  fields
    .filter((f) => !validFields.has(f))
    .reduce((prev, curr) => prev + curr, 0)
);
