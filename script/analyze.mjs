#!/usr/bin/env node

import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./data/achievements.json'));
console.log(data.length)
const permAchis = data.filter(ach => ach.flags.includes('Permanent'));
let acc = 0;
//const permAchisPts = permAchis.reduce((acc, value) => console.log(value));
console.log('perm achis', permAchis.length);
//console.log('perm achis pts', permAchisPts);
// console.log(achis)
