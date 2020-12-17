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
      // console.log(group);
      const subRes = calculate(group);
      evaluate += subRes;
      i += group.length + 1;
    } else {
      evaluate += expression[i];
    }
  }

  let sum = 0;
  const evaluateArr = ("+ " + evaluate).split(" ");
  let i = 0;
  while (i < evaluateArr.length) {
    const toEval = `${sum} ${evaluateArr[i]} ${evaluateArr[i + 1]}`;
    console.log(toEval);
    sum = eval(toEval);
    i += 2;
  }
  return sum;
}

let totalSum = 0;
for (const row of loadInput(18)) {
  totalSum += calculate(row);
}
console.log("Total: " + totalSum);
