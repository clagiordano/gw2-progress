'use server';

const baseURL = 'https://api.guildwars2.com/v2';
const baseConfig = {
	headers: {
		'Content-Type': 'application/json'
	}
};

export interface IAccount {
	name: string;
}

export async function getAccountInfo(prevState: IAccount, formData: FormData): Promise<IAccount> {
	const accessToken = formData.get('accessToken') as string;

	const options = { ...baseConfig, headers: { ...baseConfig.headers, Authorization: `Bearer ${accessToken}` } };
	const resp = await fetch(`${baseURL}/account`, options);

	let data = await resp.json();

	if (resp.ok) {
		const wdata = await fetch(`${baseURL}/worlds/${data.world}`, options);
		if (wdata.ok) {
			/**
			 * If the world exists, replace the id with the full object
			 */
			data.world = await wdata.json();
		}
	}

	return data;
}
