'use client';

import { Divider } from '@chakra-ui/react';
import { Suspense, useEffect, useState } from 'react';
import { ProgressStats } from './ProgressStats';
import { ProgressDetails } from './ProgressDetails';
import { analyze, getLocalAchievements, getUserProgression } from '@/services/achievements';

export default function Progress(  ) {
	const [progress, setProgress] = useState([]);
	const [progression, setProgression] = useState([]);

	useEffect(() => {
		getUserProgression().then((data) => setProgression(data));
	}, []);

	// useEffect(() => {
	// 	console.log('triggered by progression change', progression)
	// }, [progression]);

	useEffect(() => {
		analyze(progression).then((data) => setProgress(data));
	}, [progression]);

	return (
		<div>
			<Suspense fallback="Loading stats...">
				<ProgressStats data={progress} />
			</Suspense>

			<Divider />

			<Suspense fallback="Loading details...">
				<ProgressDetails data={progress} />
			</Suspense>
		</div>
	);
}
