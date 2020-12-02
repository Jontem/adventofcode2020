import { loadInput } from "../load-input";

let count = 0;
let passports: Array<string> = [];
for (const row of loadInput(4)) {
  if (row === "") {
    count++;
    continue;
  }

  passports[count] = passports[count] ? passports[count] + " " + row : row;
}

const requiredFields = [
  (v: string) => {
    const match = /byr:(\d{4})(\s|$)/.exec(v);
    if (match) {
      const val = parseInt(match[1], 10);
      return val >= 1920 && val <= 2002;
    }
    return false;
  },
  (v: string) => {
    const match = /iyr:(\d{4})(\s|$)/.exec(v);
    if (match) {
      const val = parseInt(match[1], 10);
      return val >= 2010 && val <= 2020;
    }
    return false;
  },
  (v: string) => {
    const match = /eyr:(\d{4})(\s|$)/.exec(v);
    if (match) {
      const val = parseInt(match[1], 10);
      return val >= 2020 && val <= 2030;
    }
    return false;
  },
  (v: string) => {
    const match = /hgt:(\d+?)(in|cm)(\s|$)/.exec(v);
    if (match) {
      const val = parseInt(match[1], 10);
      const unit = match[2] as "in" | "cm";
      if (unit === "cm") {
        return val >= 150 && val <= 193;
      } else if (unit === "in") {
        return val >= 59 && val <= 76;
      } else {
        throw new Error("invalid");
      }
    }
    return false;
  },
  (v: string) => {
    const match = /hcl:#[0-9a-f]{6}(\s|$)/.exec(v);
    if (match) {
      return true;
    }
    return false;
  },
  (v: string) => {
    const match = /ecl:(amb|blu|brn|gry|grn|hzl|oth)(\s|$)/.exec(v);
    if (match) {
      return true;
    }
    return false;
  },
  (v: string) => {
    const match = /pid:[0-9]{9}(\s|$)/.exec(v);
    if (match) {
      return true;
    }
    return false;
  },
];

let validPassports = 0;
for (const passport of passports) {
  //   if (passports.indexOf("cid:") === -1) {
  //     validPassports++;
  //   } else {
  if (requiredFields.every((f) => f(passport))) {
    console.log(passport);
    validPassports++;
  }
  //   }
}

console.log("validPassports: ", validPassports);
