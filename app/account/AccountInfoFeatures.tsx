import { Heading, Box, Text, HStack, Icon } from '@chakra-ui/react';
import { ExpansionInfo } from './ExpansionInfo';
import { GiThornyVine, GiFireDash, GiDoubleDragon, GiSecretBook } from "react-icons/gi";

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
				<ExpansionInfo
					available={features.hasGW2}
					text={features.hasGW2 ? 'GW2' : 'F2P'}
					tip="Guild Wars 2"
					bg="darkred"
				/>

				<ExpansionInfo
					available={features.hasHoT}
					text={<Icon as={GiThornyVine} boxSize={6} />}
					tip="Guild Wars 2: Heart of Thorns"
					bg="olivedrab"
				/>

				<ExpansionInfo
					available={features.hasPoF}
					text={<Icon as={GiFireDash} boxSize={6} />}
					tip="Guild Wars 2: Path of Fire"
					bg="darkmagenta"
				/>

				<ExpansionInfo
					available={features.hasEoD}
					text={<Icon as={GiDoubleDragon} boxSize={6} />}
					tip="Guild Wars 2: End of Dragons"
					bg="darkcyan"
				/>

				<ExpansionInfo
					available={features.hasSotO}
					text={<Icon as={GiSecretBook} boxSize={6} />}
					tip="Guild Wars 2: Secrets of the Obscure"
					bg="goldenrod"
				/>
			</HStack>
		</Box>
	);
};
