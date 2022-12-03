import fs from "fs";
import path from "path";

const input = fs
  .readFileSync(path.join(__dirname, "..", "..", "2022", "day-2", "input.txt"))
  .toString();

type Result = {
  draws: [number, number];
  losses: [number, number];
  wins: [number, number];
};

const results: Result = {
  draws: [0, 0],
  losses: [0, 0],
  wins: [0, 0],
};

const Enemy = {
  A: 1,
  B: 2,
  C: 3,
};

const You = {
  X: 1,
  Y: 2,
  Z: 3,
};

type ResultType = [keyof typeof Enemy, keyof typeof You];

const possibleResults: {
  draws: ResultType[];
  losses: ResultType[];
  wins: ResultType[];
} = {
  draws: [
    ["A", "X"],
    ["B", "Y"],
    ["C", "Z"],
  ],
  losses: [
    ["A", "Z"],
    ["B", "X"],
    ["C", "Y"],
  ],
  wins: [
    ["A", "Y"],
    ["B", "Z"],
    ["C", "X"],
  ],
};

const matches = input.split("\n");

for (let i = 0; i < matches.length; i++) {
  const matchType = matches[i].split(" ") as ResultType;

  for (let key in possibleResults) {
    if (
      possibleResults[key].some(
        (res) => JSON.stringify(res) === JSON.stringify(matchType)
      )
    ) {
      results[key][0]++;
      results[key][1] = results[key][1] + You[matchType[1]];
      break;
    }
  }
}

let points: number = 0;

for (let key in results) {
  switch (key) {
    case "draws":
      points = points + results[key][0] * 3 + results[key][1];
      break;
    case "losses":
      points = points + results[key][0] * 0 + results[key][1];
      break;
    case "wins":
      points = points + results[key][0] * 6 + results[key][1];
      break;
  }
}

console.log(points);
