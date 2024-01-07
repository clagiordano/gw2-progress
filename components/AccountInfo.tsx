import { IAccount } from '@/app/actions';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Heading,
	Box,
	Stack,
	StackDivider,
	Text,
	Icon,
	Tooltip,
    HStack
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import { fmt_duration } from '@/services/utils';

const AccountInfo = ({ data }: { data: IAccount }) => {
	return (
		<Card>
			<CardHeader>
				<Heading size="md">Account Information</Heading>
			</CardHeader>

			<CardBody>
				<Stack divider={<StackDivider />} spacing="4">
					<Box>
						<Heading size="xs" textTransform="uppercase">
							Owner
						</Heading>
						<Text pt="2" fontSize="sm">
							Account basic information
						</Text>

						<HStack spacing={3}>
							<Tooltip label={`ID: ${data.id}`} aria-label="info icon" fontSize="md">
								<InfoIcon />
							</Tooltip>
							<Text fontSize="lg">{data.name}</Text>
                            {/* // Wrong response from API - disbled */}
							{/* <Text fontSize="lg">{fmt_duration(data.age)}</Text> */}
						</HStack>
					</Box>

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
export default AccountInfo;
