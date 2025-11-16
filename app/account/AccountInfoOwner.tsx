import { Account } from '@/models/account';
import {
	Heading,
	Box,
	Text,
	Tooltip,
	HStack
} from '@chakra-ui/react';
import { InfoOutlineIcon, CalendarIcon, AtSignIcon } from '@chakra-ui/icons';

export const AccountInfoOwner = ({ data }: { data: Account }) => {
	return (
		<Box>
			<Heading size="xs" textTransform="uppercase">
				Owner
			</Heading>
			<Text pt="2" fontSize="sm">
				Account basic information
			</Text>

			<HStack spacing={3}>
				<Tooltip label={`ID: ${data?.id}`} aria-label="info icon" fontSize="md">
					<InfoOutlineIcon />
				</Tooltip>
				<Text fontSize="lg">{data?.name}</Text>
			</HStack>

			{/* // Wrong response from API - disbled */}
			{/* <Text fontSize="lg">{fmt_duration(data.age)}</Text> */}

			<HStack spacing={3}>
				<Tooltip label="Account creation date" aria-label="info icon" fontSize="md">
					<CalendarIcon />
				</Tooltip>
				<Text fontSize="lg">{data?.created}</Text>
			</HStack>

			<HStack spacing={3}>
				<Tooltip label="Account last modification date" aria-label="info icon" fontSize="md">
					<CalendarIcon />
				</Tooltip>
				<Text fontSize="lg">{data?.last_modified}</Text>
			</HStack>

			<HStack spacing={3}>
				<Tooltip label={`Current world: ${data?.world?.id}`} aria-label="info icon" fontSize="md">
					<AtSignIcon />
				</Tooltip>
				<Text fontSize="lg">{data?.world?.name}</Text>
			</HStack>
		</Box>
	);
};
