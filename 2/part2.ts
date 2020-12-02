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

  if (
    (password[low - 1] === validChar) !==
    (password[high - 1] === validChar)
  ) {
    console.log(password);
    return true;
  }

  return false;
}
