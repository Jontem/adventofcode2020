import { loadInput } from "../load-input";

function extractGroup(expression: string): string {
  let count = 0;
  let index = 0;
  do {
    if (expression[index] === "(") {
      count++;
    } else if (expression[index] === ")") {
      count--;
    }
    index++;
  } while (count > 0);

  return expression.substr(1, index - 2);
}

function calculate(expression: string): any {
  let evaluate = "";
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === "(") {
      const group = extractGroup(expression.substr(i));
      const subRes = calculate(group);
      evaluate += subRes;
      i += group.length + 1;
    } else {
      evaluate += expression[i];
    }
  }

  return eval(
    evaluate
      .split(" * ")
      .map((group) => `(${group})`)
      .join(" * ")
  );
}

let totalSum = 0;
for (const row of loadInput(18)) {
  totalSum += calculate(row);
}
console.log("Total: " + totalSum);
