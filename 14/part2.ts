import { loadInput } from "../load-input";

let mask: Array<string> = [];
const mem = new Map<string, number>();
for (const line of loadInput(14)) {
  const [cmd, strValue] = line.split(" = ");
  if (cmd === "mask") {
    mask = strValue.split("");
  } else {
    const memIndex = parseInt(cmd.substring(4, cmd.indexOf("]")), 10);
    const maskEntries = Array.from(mask.entries());
    let newMemIndex = memIndex.toString(2).padStart(36, "0").split("");
    for (const [index, bit] of maskEntries) {
      if (bit === "X" || bit === "0") {
        continue;
      }

      newMemIndex[index] = bit;
    }

    const memValue = parseInt(strValue, 10);
    const indexes = maskEntries
      .filter(([, bit]) => bit === "X")
      .map(([index]) => index);
    for (const address of getPermutations(
      indexes,
      new Set([newMemIndex.join("")])
    )) {
      mem.set(address, memValue);
    }
  }
}

function getPermutations(
  indexes: Array<number>,
  addresses: Set<string>
): Set<string> {
  if (indexes.length === 0) {
    return addresses;
  }

  const index = indexes.shift()!;
  for (const address of Array.from(addresses.values())) {
    const newAddress0 = address.split("");
    newAddress0[index] = "0";
    const newAddress1 = address.split("");
    newAddress1[index] = "1";
    addresses.add(newAddress0.join(""));
    addresses.add(newAddress1.join(""));
  }

  return getPermutations(indexes, addresses);
}

console.log(Array.from(mem.values()).reduce((prev, curr) => prev + curr, 0));
