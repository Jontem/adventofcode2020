import { loadInputWithOutSplit } from "../load-input";

function validateRule(field: number, rule: Array<string>): boolean {
  const [low1, high1] = rule[0].split("-").map((n) => parseInt(n, 10));
  const [low2, high2] = rule[1].split("-").map((n) => parseInt(n, 10));
  if ((field >= low1 && field <= high1) || (field >= low2 && field <= high2)) {
    return true;
  }
  return false;
}

const input = loadInputWithOutSplit(16);

const sections = input.split("\n\n");
const rules: Array<[string, Array<string>]> = sections[0]
  .split("\n")
  .map((r) => {
    const [ruleName, rule] = r.split(": ");
    const rules = rule.replace(/\w+?: /, "").split(" or ");
    return [ruleName, rules];
  });

const nearbyTickets = sections[2].replace("nearby tickets:\n", "").split("\n");
const yourTicket = sections[1]
  .replace("your ticket:\n", "")
  .split(",")
  .map((f) => parseInt(f, 10));

const validTickets: Set<string> = new Set();
for (const nearbyTicket of nearbyTickets) {
  const fields = nearbyTicket.split(",").map((f) => parseInt(f, 10));
  let ticketValid = true;
  for (const field of fields) {
    let valid = false;
    for (const rule of rules) {
      if (validateRule(field, rule[1])) {
        valid = true;
      }
    }
    if (!valid) {
      ticketValid = false;
    }
  }
  if (ticketValid) {
    validTickets.add(nearbyTicket);
  }
}
const allTickets = [
  ...Array.from(validTickets).map((v) =>
    v.split(",").map((f) => parseInt(f, 10))
  ),
  yourTicket,
];

const doneRules = new Map<string, number>();
let rulesLeft = rules.concat();
let fieldsLeft = allTickets[0].map((_, i) => i);

while (rulesLeft.length > 0) {
  for (const [ruleName, r] of rulesLeft) {
    let colMatch: Array<number> = [];
    for (const fieldIndex of fieldsLeft) {
      if (allTickets.every((vt) => validateRule(vt[fieldIndex], r))) {
        colMatch.push(fieldIndex);
      }
    }

    if (colMatch.length === 1) {
      doneRules.set(ruleName, colMatch[0]);
      rulesLeft = rulesLeft.filter(([name]) => name !== ruleName);
      fieldsLeft = fieldsLeft.filter((i) => i !== colMatch[0]);
    }
  }
}

const indexes = Array.from(doneRules.entries())
  .filter(([key]) => key.startsWith("departure"))
  .map(([, i]) => i);
console.log(indexes.reduce((prev, current) => prev * yourTicket[current], 1));
