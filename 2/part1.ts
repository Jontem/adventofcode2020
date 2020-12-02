import { loadInput } from "../load-input";

let valid = 0;
for (const input of loadInput(2)) {
  const [policy, password] = input.split(": ");
  if (isPolicyMatch(policy, password)) {
    valid++;
  }
}

console.log("Valid passwords: ", valid);

function isPolicyMatch(policy: string, password: string): boolean {
  const [times, validChar] = policy.split(" ");
  const splits = times.split("-");
  const low = parseInt(splits[0], 10);
  const high = parseInt(splits[1], 10);
  let count = 0;
  for (const char of password.split("")) {
    if (validChar === char) {
      count++;
    }
  }

  return count >= low && count <= high;
}
