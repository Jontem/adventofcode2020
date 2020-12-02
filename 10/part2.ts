import { totalmem } from "os";
import { couldStartTrivia } from "typescript";
import { loadInput } from "../load-input";

const sortedAdapters = loadInput(10)
  .map((r) => parseInt(r, 10))
  .concat(0)
  .sort((a, b) => a - b);

const maxAdapter = sortedAdapters[sortedAdapters.length - 1] + 3;
sortedAdapters.push(maxAdapter);

const DP: Array<number> = [];
console.log(dp(0));

function dp(i: number) {
  if (i === sortedAdapters.length - 1) {
    return 1;
  }
  // console.log(i);
  if (DP[i]) {
    return DP[i];
  }
  let ans = 0;

  for (let j = i + 1; j < sortedAdapters.length; j++) {
    if (sortedAdapters[j] - sortedAdapters[i] <= 3) {
      ans += dp(j);
    }
  }
  DP[i] = ans;
  return ans;
}
