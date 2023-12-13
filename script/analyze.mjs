#!/usr/bin/env node

import fs from 'fs';
import {sprintf} from 'sprintf-js';
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
console.log('progression len', progression.length);

fs.writeFileSync('data/progression.json', JSON.stringify(progression, null, 4), err => {
	if (err) {
		throw err;
	}
	console.log('JSON data is saved.');
});

const achis = JSON.parse(fs.readFileSync('./data/achievements.json'));

let tPts = 0;
let utPts = 0;
achis.forEach(group => {
	// console.log(`${group.name}: `);
	let gPts = 0;
	let ugPts = 0;
	group.categories.forEach(cat => {
		let cPts = 0;
		let ucPts = 0;

		if (!cat.achievements || cat.achievements.constructor !== Array) {
			console.warn(`Invalid achievements data for ${cat.name}, expected array`);
			return;
		}

		cat.achievements.forEach(ach => {
			let aPts = ach.tiers.reduce((aPts, t) => t.points + aPts, 0);
			let uaPts = 0;

			//console.log(ach.id)
			let fIdx = progression.findIndex(a => a.id == ach.id);
			if (fIdx !== -1) {
				// console.log('fIdx', fIdx);
				let uach = progression[fIdx];
				progression.splice(fIdx, 1);
				uaPts = ach.tiers
					.filter(t => t.count <= uach.current)
					.reduce((uaPts, t) => t.points + uaPts, 0);
			}

			// console.log(` -> ${ach.name}: ${uaPts} / ${aPts}`);
			cPts = cPts + aPts;
			ucPts = ucPts + uaPts;
		});

		//console.log(`  \u21B3 ${cat.name}: ${ucPts} / ${cPts}`);
		gPts = gPts + cPts;
		ugPts = ugPts + ucPts;
	});

	tPts = tPts + gPts;
	utPts = utPts + ugPts;
	// console.log(`${group.name} group points: ${ugPts} / ${gPts}`);
	console.log(sprintf("%25s: %5d / %5d (%3d%%)", `${group.name}`, ugPts, gPts, ((ugPts / (gPts || 1)) * 100)));
});

// console.log(`Total points: ${utPts} / ${tPts}`);
console.log(sprintf("%25s: %5d / %5d (%3d%%)", "Total points", utPts, tPts, ((utPts / (tPts || 1)) * 100)));
console.log('progression len', progression.length);
// console.log(progression)
