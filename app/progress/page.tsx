'use client';

import { Divider } from '@chakra-ui/react';
import { Suspense, useEffect, useState } from 'react';
import { ProgressStats } from './ProgressStats';
import { ProgressDetails } from './ProgressDetails';
import { analyze } from '@/services/achievements';

export default function Progress(  ) {
	const [progress, setProgress] = useState([]);

	useEffect(() => {
		analyze().then((data) => setProgress(data));
	}, []);

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
