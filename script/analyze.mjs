#!/usr/bin/env node

import fs from 'fs';
import 'dotenv/config';

const baseURL = 'https://api.guildwars2.com/v2';
const reqConfig = {
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
	}
};

const getUserProgression = async () => {
	const resp = await fetch(`${baseURL}/account/achievements`, reqConfig);
	return await resp.json();
};

const progression = await getUserProgression();

fs.writeFileSync('data/progression.json', JSON.stringify(progression, null, 4), err => {
	if (err) {
		throw err;
	}
	console.log('JSON data is saved.');
});

const achis = JSON.parse(fs.readFileSync('./data/achievements.json'));

let tPts = 0;
achis.forEach(group => {
	console.log(`${group.name}: `);
	let gPts = 0;
	group.categories.forEach(cat => {
		let cPts = 0;

		if (!cat.achievements || cat.achievements.constructor !== Array) {
			console.warn(`Invalid achievements data for ${cat.name}, expected array`);
			return;
		}

		cat.achievements.forEach(ach => {
			let aPts = ach.tiers.reduce((aPts, t) => t.points + aPts, 0);
			// console.log(` -> ${ach.name}: ${aPts}`);
			cPts = cPts + aPts;
		});

		console.log(` -> ${cat.name}: ${cPts}`);
		gPts = gPts + cPts;
	});

	tPts = tPts + gPts;
	console.log(`${group.name} total points: ${gPts}`);
});

console.log(`Total points: ${tPts}`);
