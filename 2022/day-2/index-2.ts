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

const EndRound = {
  X: [0, 1], // Loss
  Y: [3, 2], // Draw
  Z: [6, 3], // Win
};

const Enemy = {
  A: 1,
  B: 2,
  C: 3,
};

type ResultType = [keyof typeof Enemy, keyof typeof EndRound];

const checkResultByKey = (key: "X" | "Y" | "Z") => {
  return Object.keys(Enemy).reduce((prev, current) => {
    prev.push([current, key]);
    return prev;
  }, []);
};

const possibleResults: {
  draws: ResultType[];
  losses: ResultType[];
  wins: ResultType[];
} = {
  draws: checkResultByKey("Y"),
  losses: checkResultByKey("X"),
  wins: checkResultByKey("Z"),
};

const matches = input.split("\n");

const probabilities = {
  X: {
    A: 3,
    B: 1,
    C: 2,
  },
  Y: {
    A: 1,
    B: 2,
    C: 3,
  },
  Z: {
    A: 2,
    B: 3,
    C: 1,
  },
};

const replyRound = (matchType: "X" | "Y" | "Z", enemy: "A" | "B" | "C") => {
  return probabilities[matchType][enemy];
};

for (let i = 0; i < matches.length; i++) {
  const matchType = matches[i].split(" ") as ResultType;

  for (let key in possibleResults) {
    if (
      possibleResults[key].some((res) => {
        return JSON.stringify(res) === JSON.stringify(matchType);
      })
    ) {
      results[key][0]++;
      results[key][1] =
        results[key][1] + replyRound(matchType[1], matchType[0]);
      break;
    }
  }
}

let points = 0;

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
