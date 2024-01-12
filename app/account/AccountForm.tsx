'use client';

import { CheckIcon } from '@chakra-ui/icons';
import { Stack, Input, IconButton } from '@chakra-ui/react';
import { useFormStatus } from 'react-dom';

export const AccountForm = () => {
	const { pending } = useFormStatus();

	return (
		<Stack spacing={4} direction="row">
			<Input placeholder="Access Token" name="accessToken" autoComplete="accessToken" aria-disabled={pending} />
			<IconButton
				type="submit"
				aria-disabled={pending}
				colorScheme="blue"
				aria-label="Set access token"
				icon={<CheckIcon />}
			/>
		</Stack>
	);
}
