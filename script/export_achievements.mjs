#!/usr/bin/env node

import fs from 'fs';
import {setTimeout as sleep} from 'timers/promises';
import cliProgress from 'cli-progress'
const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const baseURL = 'https://api.guildwars2.com/v2';
const reqConfig = {
	headers: {
		'Content-Type': 'application/json'
	}
};

const getAchievementsGroups = async () => {
	const resp = await fetch(`${baseURL}/achievements/groups`, reqConfig);
	return await resp.json();
};

const getAchievementsGroupById = async (groupId) => {
	const resp = await fetch(`${baseURL}/achievements/groups/${groupId}`, reqConfig);
	return await resp.json();
};

const getAchievementsCategories = async () => {
	process.stdout.write('Fetching achievemnts categories...');
	const resp = await fetch(`${baseURL}/achievements/categories`, reqConfig);
	process.stdout.write(' done!\n');
	return await resp.json();
};

const getAchievementsCategoryById = async (cId) => {
	const resp = await fetch(`${baseURL}/achievements/categories?ids=${cId}`, reqConfig);
	return await resp.json();
};

const getAchievementsIds = async () => {
	process.stdout.write('Fetching achievemnts ids...');
	const resp = await fetch(`${baseURL}/achievements`, reqConfig);
	process.stdout.write(' done!\n');
	return await resp.json();
};

const getAchievementById = async aId => {
	const resp = await fetch(`${baseURL}/achievements?ids=${aId}`, reqConfig);
	return await resp.json();
};

const achievements = await getAchievementsGroups();
// console.log('achievements', achievements.length, achievements);

bar.start(achievements.length, 0);
for (const idx in achievements) {
	/**
	 * Populate groups
	 */
	achievements[idx] = await getAchievementsGroupById(achievements[idx]);

	/**
	 * Populate categories
	 */
	achievements[idx].categories = await getAchievementsCategoryById(achievements[idx].categories.join(','))

	/**
	 * Populate achievements
	 */
	for (const cId in achievements[idx].categories) {
		achievements[idx].categories[cId].achievements = await getAchievementById(achievements[idx].categories[cId].achievements.join(','));
	}

	bar.increment()
}

bar.stop();

fs.writeFileSync('data/achievements.json', JSON.stringify(achievements), err => {
	if (err) {
		throw err;
	}
	console.log('JSON data is saved.');
});
