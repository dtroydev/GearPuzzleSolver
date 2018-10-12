/* eslint no-param-reassign: "off" */

'use strict';

const abc = Array(26).fill().map((_, k) => String.fromCharCode(65 + k));

const steps = [
  [-7, 14, -3],
  [-3, 5, -1],
  [19, -6, 4, -7, 8],
  [6, -1, 12, -5],
  [3, -5, 6, -8, 2],
];

const rotateGear = (arr, n) => {
  switch (Math.sign(n)) {
    case 1:
      arr.push(arr.splice(0, 1)[0]);
      n -= 1;
      break;
    case -1:
      arr.unshift(arr.splice(-1)[0]);
      n += 1;
      break;
    default:
  }
  return n && rotateGear(arr, n);
};

let offset = 0;

const nextLetter = (arr, n) => {
  if (n > 0) n -= offset;
  rotateGear(arr, n);
  const letter = arr[0];
  // and now for the ^^BIG^^ trick, get rid of the character
  arr.splice(0, 1);
  // fix the count for a possible subsequent move in a positive direction
  offset = 1;
  return letter;
};

steps.forEach(e => process.stdout.write(`${e.reduce((a, v) => a + nextLetter(abc, v), '')} `));
console.log();
