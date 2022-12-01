const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt")).toString();

const groups = input.split("\n\n");
const elfsCals = [];

for (const group in groups) {
  let cals = 0;

  groups[group].split("\n").forEach((elfCals) => cals += Number(elfCals))

  elfsCals.push(cals);
}

console.log(elfsCals.sort((a, b) => b - a)[0])
