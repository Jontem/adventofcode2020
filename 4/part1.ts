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

console.log(passports);
const requiredFields = [
  "byr", // (Birth Year)
  "iyr", // (Issue Year)
  "eyr", // (Expiration Year)
  "hgt", // (Height)
  "hcl", // (Hair Color)
  "ecl", //(Eye Color)
  "pid", //(Passport ID)
  //   "cid", // (Country ID)
];

let validPassports = 0;
for (const passport of passports) {
  //   if (passports.indexOf("cid:") === -1) {
  //     validPassports++;
  //   } else {
  if (requiredFields.every((v) => passport.indexOf(`${v}:`) > -1)) {
    validPassports++;
  }
  //   }
}

console.log("validPassports: ", validPassports);
