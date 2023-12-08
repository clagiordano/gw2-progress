#!/usr/bin/env node

import fs from 'fs';
import 'dotenv/config';

const baseURL = 'https://api.guildwars2.com/v2';
const reqConfig = {
	headers: {
		'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
	}
};

const getUserProgression = async () => {
    const resp = await fetch(`${baseURL}/account/achievements`, reqConfig);
	return await resp.json();
}

const progression = await getUserProgression();
console.log(progression);

// const data = JSON.parse(fs.readFileSync('./data/achievements.json'));
// console.log(data.length)
// const permAchis = data.filter(ach => ach.flags.includes('Permanent'));
// let acc = 0;
// //const permAchisPts = permAchis.reduce((acc, value) => console.log(value));
// console.log('perm achis', permAchis.length);
// //console.log('perm achis pts', permAchisPts);
// // console.log(achis)
