import { loadInput } from "../load-input";

const map = new Map<string, number>();

const input = loadInput(6);
let group = "";
const groups: Array<string> = [];
for (const line of input) {
  group += line;
  if (line === "") {
    groups.push(group);
    group = "";
  }
}
if (group.length > 0) {
  groups.push(group);
}

for (const group of groups) {
  const uniqueQuestions = Array.from(new Set(group.split("")));
  for (const q of uniqueQuestions) {
    map.set(q, (map.get(q) || 0) + 1);
  }
}

console.log(
  Array.from(map.values()).reduce((prev, current) => prev + current, 0)
);
