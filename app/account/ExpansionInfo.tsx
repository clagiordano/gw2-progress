import { Center, Tooltip, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

export const ExpansionInfo = ({
	available,
	text,
	tip,
	bg,
	fg = 'white'
}: {
	available: boolean;
	text: string | ReactNode;
	tip: string;
	bg: string;
	fg?: string;
}) => {
	return (
		<Tooltip fontSize="md" label={`${tip} is ${available ? 'available' : 'not available'}`}>
			<Center borderRadius="md" bg={available ? bg : 'darkgray'} color={fg} px={4} h={16} w={16}>
				<Text fontSize="lg" fontWeight={'bold'}>
					{text}
				</Text>
			</Center>
		</Tooltip>
	);
};
