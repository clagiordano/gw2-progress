'use client'

import { IAccount } from '@/models/IAccount';
import { Card, CardHeader, CardBody, Heading, Box, Stack, StackDivider, Text } from '@chakra-ui/react';
import { AccountInfoOwner } from '@/app/account/AccountInfoOwner';
import { AccountInfoFeatures } from './AccountInfoFeatures';
import { AccountInfoGuilds } from './AccountInfoGuilds';
import { Suspense } from 'react';

export const AccountInfo = ({ data }: { data: IAccount }) => {
	return (
		<Card>
			<CardHeader>
				<Heading size="md">Account Information</Heading>
			</CardHeader>

			{/* <Suspense fallback="Loading..."> */}
				<CardBody>
					<Stack divider={<StackDivider />} spacing="4">
						<AccountInfoOwner data={data} />

						<AccountInfoFeatures data={data.access} />

						<AccountInfoGuilds data={data.guilds} />

						<Box>
							<Heading size="xs" textTransform="uppercase">
								Basic statistics
							</Heading>
							<Text pt="2" fontSize="sm">
								WvW rank, fractal, commander tag, recurring APs, (masteries?) etc
							</Text>
						</Box>
					</Stack>
				</CardBody>
			{/* </Suspense> */}
		</Card>
	);
};
