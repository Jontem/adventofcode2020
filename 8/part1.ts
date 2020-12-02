import { loadInput } from "../load-input";

const instructions = loadInput(8);
const executedInstructions = new Set<number>();

let intPointer: number = 0;
let accumulator: number = 0;
while (true) {
  const instruction = instructions[intPointer];
//   console.log(instruction);
  if (executedInstructions.has(intPointer)) {
    break;
  }
  executedInstructions.add(intPointer);
  const [operation, arg] = instruction.split(" ");

  switch (operation) {
    case "nop": {
      intPointer++;
      break;
    }
    case "acc": {
      accumulator += parseInt(arg, 10);
      intPointer++;
      break;
    }
    case "jmp": {
      intPointer += parseInt(arg, 10);
      break;
    }
    default: {
      throw new Error(`Unhandled operation: ${operation}`);
    }
  }
}

console.log("Accumulator: ", accumulator);
