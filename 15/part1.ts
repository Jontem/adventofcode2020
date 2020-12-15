import { loadInput } from "../load-input";

const numbers = loadInput(15)[0]
  .split(",")
  .map((s) => parseInt(s, 10));

const saidNumbers = new Map<number, Array<number>>(
  numbers.map((n, i) => [n, [i + 1]])
);

let lastNumberSpoken: number = numbers[numbers.length - 1];
for (let turn = numbers.length + 1; turn <= 2020; turn++) {
  const prevSpoken = saidNumbers.get(lastNumberSpoken) || [];
  const toSpeak =
    prevSpoken.length > 1
      ? prevSpoken[prevSpoken.length - 1] - prevSpoken[prevSpoken.length - 2]
      : 0;

  const toSpeakPrev = saidNumbers.get(toSpeak) || [];
  toSpeakPrev.push(turn);
  saidNumbers.set(toSpeak, toSpeakPrev);
  lastNumberSpoken = toSpeak;
}
console.log(lastNumberSpoken);
