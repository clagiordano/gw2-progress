'use client';

import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { getAccountInfo } from '@/app/actions';
import { AccountInfo } from './AccountInfo';
import { Input, Stack, IconButton } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { IAccount } from '@/models/IAccount';

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

export default function Page() {
	const [state, formAction] = useFormState(getAccountInfo, initialState);
	const { pending } = useFormStatus();

	return (
		<div>
			<form action={formAction}>
				<Stack spacing={4} direction="row">
					<Input placeholder="Access Token" name="accessToken" autoComplete="accessToken" />

					<IconButton
						type="submit"
						aria-disabled={pending}
						colorScheme="blue"
						aria-label="Set access token"
						icon={<CheckIcon />}
					/>
				</Stack>
			</form>

			<AccountInfo data={state} />
		</div>
	);
}
