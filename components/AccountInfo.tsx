import { IAccount } from '@/app/actions';
import { Card, CardHeader, CardBody, Heading, Box, Stack, StackDivider, Text } from '@chakra-ui/react';
import { AccountInfoOwner } from '@/components/AccountInfoOwner';

export const AccountInfo = ({ data }: { data: IAccount }) => {
	return (
		<Card>
			<CardHeader>
				<Heading size="md">Account Information</Heading>
			</CardHeader>

			<CardBody>
				<Stack divider={<StackDivider />} spacing="4">
					<AccountInfoOwner data={data} />

					<Box>
						<Heading size="xs" textTransform="uppercase">
							Features
						</Heading>
						<Text pt="2" fontSize="sm">
							Expansion list availability
						</Text>
					</Box>

					<Box>
						<Heading size="xs" textTransform="uppercase">
							Guilds
						</Heading>
						<Text pt="2" fontSize="sm">
							Guilds this account belongs to
						</Text>
					</Box>

					<Box>
						<Heading size="xs" textTransform="uppercase">
							Basic statistics
						</Heading>
						<Text pt="2" fontSize="sm">
							WvW rank, fractal, commander tag, recurring APs etc
						</Text>
					</Box>
				</Stack>
			</CardBody>
		</Card>
	);
};
