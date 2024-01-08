import { IAccount } from '@/app/actions';
import { Card, CardHeader, CardBody, Heading, Box, Stack, StackDivider, Text } from '@chakra-ui/react';
import { AccountInfoOwner } from '@/components/AccountInfoOwner';
import { AccountInfoFeatures } from './AccountInfoFeatures';
import { AccountInfoGuilds } from './AccountInfoGuilds';

export const AccountInfo = ({ data }: { data: IAccount }) => {
	return (
		<Card>
			<CardHeader>
				<Heading size="md">Account Information</Heading>
			</CardHeader>

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
		</Card>
	);
};
