'use client';
import { Suspense } from 'react';
import { fonts } from './fonts';
import { Providers } from './providers';
import { Grid, GridItem, Link, Spinner, VStack } from '@chakra-ui/react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={fonts.rubik.variable}>
			<body>
				<Providers>
					<Grid
						templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
						gridTemplateRows={'50px 1fr 30px'}
						gridTemplateColumns={'150px 1fr'}
						h="100vh"
						gap="1"
						// color="blackAlpha.700"
						// fontWeight="bold"
					>
						<GridItem pl="2" bg="orange.300" area={'header'}>
							Header
						</GridItem>
						<GridItem pl="2" bg="pink.300" area={'nav'}>
							<VStack>
								<Link href="/account">Account</Link>
								<Link href="/progress">Progress</Link>
							</VStack>
						</GridItem>
						<GridItem pl="2" area={'main'}>
							{/* <Suspense fallback={<Spinner size='xl' />}>{children}</Suspense> */}
							{children}
						</GridItem>
						<GridItem pl="2" bg="blue.300" area={'footer'}>
							Footer
						</GridItem>
					</Grid>
				</Providers>
			</body>
		</html>
	);
}
