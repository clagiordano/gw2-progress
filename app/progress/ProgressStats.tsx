'use client';
import { StatGroup, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Stack, SimpleGrid } from '@chakra-ui/react';

export const ProgressStats = ({ data }: { data: any[] }) => {
	return (
			<StatGroup>
                <SimpleGrid columns={8} spacing={4}>
				{data.map((group: any) => {
					return (
						<Stat key={group.id}>
							<StatLabel>{group.name}</StatLabel>
							<StatNumber>{group.gPtsPercent}%</StatNumber>
							<StatHelpText>
								{group.ugPts} / {group.gPts}
							</StatHelpText>
						</Stat>
					);
				})}
                </SimpleGrid>
			</StatGroup>
	);
};
