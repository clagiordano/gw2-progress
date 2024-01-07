'use client';

import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { getAccountInfo, IAccount } from '@/app/actions';
import AccountInfo from '@/components/AccountInfo';
import { Input, Stack, IconButton } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const initialState: IAccount = {
	name: ''
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
						aria-label="Search database"
						icon={<CheckIcon />}
					/>
				</Stack>
			</form>

			<h1>Account Name: {state?.name}</h1>
			<AccountInfo data={state}/>
		</div>
	);
}

