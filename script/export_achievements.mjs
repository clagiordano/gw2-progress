#!/usr/bin/env node

import fs from 'fs';
import {setTimeout as sleep} from 'timers/promises';

const baseURL = 'https://api.guildwars2.com/v2';
const reqConfig = {
	headers: {
		'Content-Type': 'application/json'
	}
};

const getAchievementsIds = async () => {
	process.stdout.write('Fetching achievemnts ids...');
	const resp = await fetch(`${baseURL}/achievements`, reqConfig);
	process.stdout.write(' done!\n');
	return await resp.json();
};

const getAchievementById = async aId => {
	//console.info(`Fetching achievemnt ${aId}...`);
	const resp = await fetch(`${baseURL}/achievements/${aId}`, reqConfig);
	//console.info(`Fetching achievemnt ${aId} completed`);
	return await resp.json();
};

let ids = await getAchievementsIds();
ids = ids.sort((a, b) => a - b);
// console.log(ids);
let achievements = [];
let counter = 1;
for (let idx in ids) {
	achievements.push(await getAchievementById(ids[idx]));
	process.stdout.write(`\rFetching ${counter} / ${ids.length}`);
	counter++;
	await sleep(150);
}

fs.writeFileSync('data/achievements.json', JSON.stringify(achievements), err => {
	if (err) {
		throw err;
	}
	console.log('JSON data is saved.');
});
