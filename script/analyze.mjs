#!/usr/bin/env node

import fs from 'fs';
import {sprintf} from 'sprintf-js';
import 'dotenv/config';
const skipFetchProgression = process.argv[2] ?? false;

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

const loadUserProgression = (path = 'data/progression.json') => {
	return JSON.parse(fs.readFileSync(path));
}

const saveUserProgression = (data, path = 'data/progression.json') => {
	fs.writeFileSync(path, JSON.stringify(data, null, 4), err => {
		if (err) {
			throw err;
		}
		console.log('Progression data saved.');
	});
}

const oldProgression = loadUserProgression();
let progression = oldProgression;
if (!skipFetchProgression) {
	progression = await getUserProgression();
	saveUserProgression(progression);
}
//console.log('progression len', progression.length);



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

			let fIdx = progression.findIndex(a => a.id == ach.id);
			if (fIdx !== -1) {
				// console.log('fIdx', fIdx);
				let uach = progression[fIdx];
				progression.splice(fIdx, 1);
				uaPts = ach.tiers
					.filter(t => t.count <= uach.current)
					.reduce((uaPts, t) => t.points + uaPts, 0);

				if (uach.repeated) {
					/** Include repeated times */
					// console.log('repeated ', ach.name, uach.repeated, aPts, (aPts * uach.repeated));
					let uaPtsRepeated = (aPts * uach.repeated);
					if (uaPtsRepeated > ach.point_cap) {
						uaPtsRepeated = ach.point_cap;
					}
					uaPts = uaPts + uaPtsRepeated;
				}
			}

			if (ach.point_cap && ach.point_cap > 0) {
				/**
				 * For repeatable achievements use point_cap as maximum earnable amount
				 * -1 means infinite
				 */
				//console.log('override aPts', aPts, '->', ach.point_cap);
				aPts = ach.point_cap;
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
//console.log('progression len', progression.length);
// console.log(progression)
