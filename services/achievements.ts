'use server';

import { getToken } from "@/app/actions";

const baseOptions = {
	headers: {
		'Content-Type': 'application/json'
	},
	next: { revalidate: 3600 }
};

export const getAchievements = async () => {
	const achievements = await getAchievementsGroups();
	console.log('achievements', achievements.length, achievements);

	for (const idx in achievements) {
		console.log('fetching ', achievements[idx]);
		/**
		 * Populate groups
		 */
		achievements[idx] = await getAchievementsGroupsById(achievements[idx]);
		console.log('achievements[idx]', achievements[idx]);

		/**
		 * Populate categories
		 */
		achievements[idx].categories = await getAchievementsCategoryById(achievements[idx].categories.join(','));

		/**
		 * Populate achievements
		 */
		for (const cId in achievements[idx].categories) {
			achievements[idx].categories[cId].achievements = await getAchievementById(
				achievements[idx].categories[cId].achievements.join(',')
			);
		}
	}

	return achievements;
};

export const getUserProgression = async () => {
	const accessToken = await getToken();

	const options = {
		...baseOptions.headers,
		headers: { ...baseOptions.headers, Authorization: `Bearer ${accessToken}` }
	};
	const resp = await fetch(`${process.env.API_GW_BASE_URL}/account/achievements`, options);

	if (!resp.ok) {
		console.error('Failed to fetch user progression', resp.ok, resp.status, resp.statusText);
		return [];
	}

	return await resp.json();
};

async function getAchievementsGroups() {
	const resp = await fetch(`${process.env.API_GW_BASE_URL}/achievements/groups`, baseOptions);
	return await resp.json();
}

async function getAchievementsGroupsById(groupId: number | string) {
	const resp = await fetch(`${process.env.API_GW_BASE_URL}/achievements/groups/${groupId}`, baseOptions);
	return await resp.json();
}

async function getAchievementsCategoryById(cId: number | string) {
	const resp = await fetch(`${process.env.API_GW_BASE_URL}/achievements/categories?ids=${cId}`, baseOptions);
	return await resp.json();
}

async function getAchievementById(aId: number | string) {
	if (!aId) {
		/**
		 * On emprty aId directly returns an empty array to avoid useless api calls
		 */
		return [];
	}
	const resp = await fetch(`${process.env.API_GW_BASE_URL}/achievements?ids=${aId}`, baseOptions);
	return await resp.json();
}

export const analyze = async () => {
	const achievements = (await getAchievements()) || [];
	const progression = (await getUserProgression()) || [];

	let tPts = 0;
	let utPts = 0;

	if (achievements && achievements.constructor === Array) {
		achievements.map((group: any) => {
			// console.log(`${group.name}: `);
			let gPts = 0;
			let ugPts = 0;

			group.gPts = 0;
			group.ugPts = 0;

			group.categories.map((cat: any) => {
				let cPts = 0;
				let ucPts = 0;

				cat.cPts = 0;
				cat.ucPts = 0;

				if (!cat.achievements || cat.achievements.constructor !== Array) {
					console.warn(`Invalid achievements data for ${cat.name}, expected array`);
					return;
				}

				cat.achievements.map((ach: any) => {
					let aPts = ach.tiers.reduce((aPts: number, t: any) => t.points + aPts, 0);
					let uaPts = 0;

					if (progression && progression.constructor === Array) {
						let fIdx = progression.findIndex((a: any) => a.id == ach.id);
						if (fIdx !== -1) {
							// console.log('fIdx', fIdx);
							let uach = progression[fIdx];
							progression.splice(fIdx, 1);
							uaPts = ach.tiers
								.filter((t: any) => t.count <= uach.current)
								.reduce((uaPts: number, t: any) => t.points + uaPts, 0);

							if (uach.repeated) {
								/** Include repeated times */
								// console.log('repeated ', ach.name, uach.repeated, aPts, (aPts * uach.repeated));
								let uaPtsRepeated = aPts * uach.repeated;
								if (uaPtsRepeated > ach.point_cap) {
									uaPtsRepeated = ach.point_cap;
								}
								uaPts = uaPts + uaPtsRepeated;
							}
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

					ach.aPts = aPts;
					ach.uaPts = uaPts;

					// console.log(` -> ${ach.name}: ${uaPts} / ${aPts}`);
					cPts = cPts + aPts;
					ucPts = ucPts + uaPts;

					cat.cPts = cPts;
					cat.ucPts = ucPts;

					cat.cPtsPercent = Math.round((ucPts / (cPts || 1)) * 100);
				});

				//console.log(`  \u21B3 ${cat.name}: ${ucPts} / ${cPts}`);
				gPts = gPts + cPts;
				ugPts = ugPts + ucPts;
			});

			group.gPts = gPts;
			group.ugPts = ugPts;

			tPts = tPts + gPts;
			utPts = utPts + ugPts;
			// console.log(`${group.name} group points: ${ugPts} / ${gPts}`);
			//console.log(sprintf("%25s: %5d / %5d (%3d%%)", `${group.name}`, ugPts, gPts, ((ugPts / (gPts || 1)) * 100)));

			group.gPtsPercent = Math.round((ugPts / (gPts || 1)) * 100);
		});
	}

	return achievements;
};
