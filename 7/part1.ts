import { loadInput } from "../load-input";

const input = loadInput(7);
const bagsToCheck: Array<string> = [];
for (const row of input) {
  const [bag, rest] = row.split(" contain ");
  for (const subBag of rest.split(", ")) {
    const match = /\d+? (.+?)s?(\.|$)/.exec(subBag);
    if (match && /shiny gold bags?/.test(match[1])) {
      bagsToCheck.push(removeS(bag));
    }
  }
}

const shinyBags = new Set<string>(bagsToCheck);

while (bagsToCheck.length > 0) {
  const bagToCheck = bagsToCheck.pop()!;
  for (const row of input) {
    const [bag, rest] = row.split(" contain ");
    for (const subBag of rest.split(", ")) {
      if (subBag.indexOf(bagToCheck) > -1) {
        bagsToCheck.push(removeS(bag));
        shinyBags.add(removeS(bag));
      }
    }
  }
}

console.log(shinyBags);

function removeS(value: string) {
  return value.endsWith("s") ? value.substr(0, value.length - 1) : value;
}
