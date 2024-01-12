// import achievements from '@/data/achievements.json' assert { type: 'json' };
import { Divider } from '@chakra-ui/react';
import { Suspense } from 'react';
import { ProgressStats } from './ProgressStats';
import { ProgressDetails } from './ProgressDetails';
import { analyze } from '@/services/achievements';

export default async function Page() {
	const data: any = await analyze();
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
