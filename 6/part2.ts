import { loadInput } from "../load-input";

const groups = createGroups(loadInput(6));

const all: Array<number> = [];
for (const group of groups) {
  const answersByQuestion = new Map<string, number>();
  for (const q of group.join("")) {
    answersByQuestion.set(q, (answersByQuestion.get(q) || 0) + 1);
  }

  const count = Array.from(answersByQuestion.entries()).filter(
    ([_, answers]) => answers === group.length
  ).length;
  all.push(count);
}

console.log(all.reduce((prev, current) => prev + current, 0));

function createGroups(input: ReadonlyArray<string>): Array<Array<string>> {
  const groups: Array<Array<string>> = [];
  let group: Array<string> = [];
  for (const line of input) {
    if (line === "") {
      groups.push(group);
      group = [];
    } else {
      group.push(line);
    }
  }

  if (group.length > 0) {
    groups.push(group);
  }
  return groups;
}
