import { Heading, Box, Text, Tooltip, HStack, List, ListIcon, ListItem, Badge } from '@chakra-ui/react';
import { InfoOutlineIcon, CalendarIcon, AtSignIcon, CheckCircleIcon } from '@chakra-ui/icons';

export const AccountInfoGuilds = ({ data }: { data: any[] }) => {
	return (
		<Box>
			<Heading size="xs" textTransform="uppercase">
				Guilds
			</Heading>
			<Text pt="2" fontSize="sm">
				Guilds this account belongs to
			</Text>

			<List spacing={3}>
				{data.map((guild: any) => {
					return (
						<ListItem key={guild.id}>
							{/* <ListIcon as={CheckCircleIcon} /> */}
							<Badge variant="solid">{guild.tag}</Badge> {guild.name} - lvl {guild.level} - members{' '}
							{guild.member_count} / {guild.member_capacity}
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
};
