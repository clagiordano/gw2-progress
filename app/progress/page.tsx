// import achievements from '@/data/achievements.json' assert { type: 'json' };
import { Divider } from '@chakra-ui/react';
import { Suspense } from 'react';
import { ProgressStats } from './ProgressStats';
import { ProgressDetails } from './ProgressDetails';
import { analyze } from '@/services/achievements';
import { GetStaticProps } from 'next';

export default async function Page(  ) {
	const data = await analyze();

	return (
		<div>
			<Suspense fallback="Loading stats...">
				<ProgressStats data={data} />
			</Suspense>

			<Divider />

			<Suspense fallback="Loading details...">
				<ProgressDetails data={data} />
			</Suspense>
		</div>
	);
}
