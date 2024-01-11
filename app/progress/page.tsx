'use server';

import achievements from '@/data/achievements.json' assert { type: 'json' };
import {
	Divider,
	ListItem,
	UnorderedList
} from '@chakra-ui/react';
import { Suspense } from 'react';
import { ProgressStats } from './ProgressStats';
import { ProgressDetails } from './ProgressDetails';

export default async function Page() {
	async function analyze() {
		console.log('token', process.env.ACCESS_TOKEN);
		// console.log(achievements);

		const progression = await getUserProgression();

		let tPts = 0;
		let utPts = 0;
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

		return achievements;
	}

	const getUserProgression = async () => {
		let baseOptions = process.env.API_GW_BASE_OPTIONS;

		const options = {
			...baseOptions.headers,
			headers: { ...baseOptions.headers, Authorization: `Bearer ${process.env.ACCESS_TOKEN}` }
		};
		const resp = await fetch(`${process.env.API_GW_BASE_URL}/account/achievements`, options);
		return await resp.json();
	};

	const data: any = await analyze();

	// console.log(data);
	return (

		<div>
			<Suspense fallback="Loading user progress...">
				<ProgressStats data={data} />

				<Divider />

				<ProgressDetails data={data} />

				<Divider />

			</Suspense>
		</div>
	);
}
