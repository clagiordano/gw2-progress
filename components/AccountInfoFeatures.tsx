import { IAccount } from '@/app/actions';
import { Heading, Box, Text, Tooltip, HStack, Center } from '@chakra-ui/react';
import { InfoOutlineIcon, CalendarIcon, AtSignIcon } from '@chakra-ui/icons';

const features = {
	hasF2P: false,
	hasGW2: false,
	hasHoT: false,
	hasPoF: false,
	hasEoD: false,
	hasSotO: false
};
const parseFeatures = (data: string[]) => {
	/**
	 * @see https://wiki.guildwars2.com/wiki/API:2/account
	 */
	if (data.includes('None')) {
		// None – should probably never happen
		return features;
	}

	if (data.includes('HeartOfThorns')) {
		features.hasGW2 = true;
		features.hasHoT = true;
	}

	if (data.includes('PathOfFire')) {
		features.hasGW2 = true;
		features.hasHoT = true;
		features.hasPoF = true;
	}

	if (data.includes('EndOfDragons')) {
		features.hasGW2 = true;
		features.hasEoD = true;
	}
};

export const AccountInfoFeatures = ({ data }: { data: string[] }) => {
	parseFeatures(data);
	return (
		<Box>
			<Heading size="xs" textTransform="uppercase">
				Features
			</Heading>
			<Text pt="2" fontSize="sm">
				Expansion list availability
			</Text>
			<HStack spacing={4} direction="row">
				<Center borderRadius="md" bg="red" color="white" px={4} h={16} w={16}>
					<Text fontSize="lg" fontWeight={'bold'}>
						{features.hasGW2 ? 'GW2' : 'F2P'}
					</Text>
				</Center>
				<Center borderRadius="md" bg="olivedrab" color="white" px={4} h={16} w={16}>
					<Text fontSize="lg" fontWeight={'bold'}>
						HoT
					</Text>
				</Center>
				<Center borderRadius="md" bg="darkmagenta" color="white" px={4} h={16} w={16}>
					<Text fontSize="lg" fontWeight={'bold'}>
						PoF
					</Text>
				</Center>
				<Center borderRadius="md" bg="darkcyan" color="white" px={4} h={16} w={16}>
					<Text fontSize="lg" fontWeight={'bold'}>
						Eod
					</Text>
				</Center>

				<Tooltip
					fontSize="md"
					label={`Guild Wars 2: Secrets of the Obscure is ${
						features.hasSotO ? 'available' : 'not available'
					}`}
				>
					<Center
						borderRadius="md"
						bg={features.hasSotO ? 'goldenrod' : 'darkgray'}
						color="white"
						px={4}
						h={16}
						w={16}
					>
						<Text fontSize="lg" fontWeight={'bold'}>
							SotO
						</Text>
					</Center>
				</Tooltip>
			</HStack>
		</Box>
	);
};
