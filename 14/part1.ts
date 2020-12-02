import { loadInput } from "../load-input";

let mask: Array<string> = [];
const mem = new Map<number, number>();
for (const line of loadInput(14)) {
  const [cmd, strValue] = line.split(" = ");
  if (cmd === "mask") {
    mask = strValue.split("");
  } else {
    const memIndex = parseInt(cmd.substring(4, cmd.indexOf("]")), 10);
    const memValue = parseInt(strValue, 10);
    let memStr = memValue.toString(2).padStart(36, "0").split("");
    for (const [index, bit] of Array.from(mask.entries())) {
      if (bit === "X") {
        continue;
      }

      memStr[index] = bit;
    }
    const newMemValue = parseInt(memStr.join(""), 2);
    mem.set(memIndex, newMemValue);
  }
}

console.log(Array.from(mem.values()).reduce((prev, curr) => prev + curr, 0));
