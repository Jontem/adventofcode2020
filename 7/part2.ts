import { loadInput } from "../load-input";

const input = loadInput(7);

console.log(countBags("shiny gold bag") - 1);

function countBags(bagToCheck: string): number {
  const row = input.find(
    (row) => row.split(" contain ")[0].indexOf(bagToCheck) > -1
  )!;
  const [bag, rest] = row.split(" contain ");
  if (rest.indexOf("no other") > -1) {
    return 1;
  }

  const values: Array<number> = [];
  for (const subBag of rest.split(", ")) {
    const matches = /(\d+?) (.+?)s?(\.|$)/.exec(removeS(subBag))!;
    const multiplier = parseInt(matches[1], 10);
    const numberOfBags = countBags(removeS(matches[2]));
    values.push(multiplier * numberOfBags);
  }
  const val = values.reduce((prev, current) => prev + current, 0);
  console.log("olle:", bagToCheck);
  return val + 1;
}

function removeS(value: string) {
  return value.endsWith("s") ? value.substr(0, value.length - 1) : value;
}
