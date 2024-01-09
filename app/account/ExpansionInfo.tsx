import { Center, Tooltip, Text } from '@chakra-ui/react';

export const ExpansionInfo = ({
	available,
	text,
	tip,
	bg
}: {
	available: boolean;
	text: string;
	tip: string;
	bg: string;
}) => {
	return (
		<Tooltip fontSize="md" label={`${tip} is ${available ? 'available' : 'not available'}`}>
			<Center borderRadius="md" bg={available ? bg : 'darkgray'} color="white" px={4} h={16} w={16}>
				<Text fontSize="lg" fontWeight={'bold'}>
					{text}
				</Text>
			</Center>
		</Tooltip>
	);
};
