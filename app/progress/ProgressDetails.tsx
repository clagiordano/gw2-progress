'use client';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';

export const ProgressDetails = ({ data }: { data: any[] }) => {
	return (
		<Accordion allowToggle>
			{data.map((group: any) => {
				return (
					<AccordionItem key={group.id}>
						<h2>
							<AccordionButton>
								<Box as="span" flex="1" textAlign="left">
									{group.name} {group.gPtsPercent}% ({group.ugPts} / {group.gPts})
								</Box>
								<AccordionIcon />
							</AccordionButton>
						</h2>

						<AccordionPanel pb={4}>
							<Accordion allowToggle>
								{group.categories.map((category: any) => {
									return (
										<AccordionItem key={category.id}>
											<h3>
												<AccordionButton>
													<Box as="span" flex="1" textAlign="left">
														{category.name} {category.cPtsPercent}% ({category.ucPts} /{' '}
														{category.cPts})
													</Box>
													<AccordionIcon />
												</AccordionButton>
											</h3>

											<AccordionPanel pb={4}>
												<Accordion allowToggle>
													{category.achievements.map((achievement: any) => {
														return (
															<AccordionItem key={achievement.id}>
																<h4>
																	<AccordionButton>
																		<Box as="span" flex="1" textAlign="left">
																			{achievement.name}  (
																			{achievement.uaPts} / {achievement.aPts})
																		</Box>
																		<AccordionIcon />
																	</AccordionButton>
																</h4>
															</AccordionItem>
														);
													})}
												</Accordion>
											</AccordionPanel>
										</AccordionItem>
									);
								})}
							</Accordion>
						</AccordionPanel>
					</AccordionItem>
				);
			})}
		</Accordion>
	);
};
