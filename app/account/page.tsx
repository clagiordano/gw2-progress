import { getAccountInfo, setToken } from '@/app/actions';
import { AccountInfo } from './AccountInfo';
import { Spinner } from '@chakra-ui/react';
import { IAccount } from '@/models/IAccount';
import { Suspense } from 'react';
import { AccountForm } from './AccountForm';

const initialState: IAccount = {
	id: '-',
	name: '-',
	age: 0,
	last_modified: '-',
	world: {
		id: 0,
		name: '-',
		population: '-'
	},
	guilds: [],
	guild_leader: [],
	created: '-',
	access: ['None'],
	commander: false,
	fractal_level: 0,
	daily_ap: 0,
	monthly_ap: 0,
	wvw_rank: 0,
	build_storage_slots: 0
};

let accountData: IAccount = initialState;

export default function Page() {
	async function saveToken(formData: FormData) {
	  'use server'


	  await setToken(formData.get('accessToken') as string);
	  accountData = await getAccountInfo();
	}

	return <form action={saveToken}>
		<AccountForm />
		{/* <Suspense fallback={<Spinner size='xl' />}> */}
			<AccountInfo data={accountData} />
		{/* </Suspense> */}
	</form>
  }
