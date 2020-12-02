import { loadInput } from "../load-input";
const operationToTest = new Set<string>(["nop", "jmp"]);

const originalInstructions = loadInput(8);
const instructionsToTest = Array.from(
  originalInstructions.entries()
).filter(([_, i]) => operationToTest.has(i.split(" ")[0]));

for (const [instructionIndex, operation] of instructionsToTest) {
  let intPointer: number = 0;
  let accumulator: number = 0;
  const executedInstructions = new Set<number>();
  const modifiedInstructions = originalInstructions.concat();
  modifiedInstructions[instructionIndex] =
    modifiedInstructions[instructionIndex].indexOf("jmp") > -1
      ? modifiedInstructions[instructionIndex].replace("jmp", "nop")
      : modifiedInstructions[instructionIndex].replace("nop", "jmp");

  while (true) {
    const instruction = modifiedInstructions[intPointer];
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

    if (intPointer >= originalInstructions.length) {
      console.log("Accumulator: ", accumulator);
      process.exit(0);
    }
  }
}

console.log("Oops");
