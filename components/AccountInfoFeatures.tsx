import { IAccount } from '@/app/actions';
import { Heading, Box, Text, Tooltip, HStack } from '@chakra-ui/react';
import { InfoOutlineIcon, CalendarIcon, AtSignIcon } from '@chakra-ui/icons';

export const AccountInfoFeatures = ({ data }: { data: string[] }) => {
	return (
		<Box>
			<Heading size="xs" textTransform="uppercase">
				Features
			</Heading>
			<Text pt="2" fontSize="sm">
				Expansion list availability
			</Text>
		</Box>
	);
};
