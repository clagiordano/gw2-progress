'use server';

const baseURL = 'https://api.guildwars2.com/v2';
const baseConfig = {
	headers: {
		'Content-Type': 'application/json'
	}
};

export interface IAccount {
	id: string;
	age: number;
	name: string;
	world: {
		id: number;
		name: string;
		population: string; // Low, Medium, High, VeryHigh, Full
	};
	guilds: any[];
	guild_leader: any[];
	created: string;
	access: string[];
	commander: boolean;
	fractal_level: number;
	daily_ap: number;
	monthly_ap: number;
	wvw_rank: number;
	last_modified: string;
	build_storage_slots: number;
}

export async function getAccountInfo(prevState: IAccount, formData: FormData): Promise<IAccount> {
	const accessToken = formData.get('accessToken') as string;

	const options = { ...baseConfig, headers: { ...baseConfig.headers, Authorization: `Bearer ${accessToken}` } };
	const resp = await fetch(`${baseURL}/account?v=latest`, options);

	let data = await resp.json();

	if (resp.ok) {
		const wdata = await fetch(`${baseURL}/worlds/${data.world}`, options);
		if (wdata.ok) {
			/**
			 * If the world exists, replace the id with the full object
			 */
			data.world = await wdata.json();
		}

		const gIds = data.guilds;
		data.guilds = [];
		/**
		 * Replaces guild ids with fetched objects
		 */
		for (const gIdx in gIds) {
			let gdata = await fetch(`${baseURL}/guild/${gIds[gIdx]}`, options);

			if (gdata.ok) {
				/**
				 * If the guild exists, replace the id with the full object
				 */
				data.guilds.push( await gdata.json());
			}
		};

	}

	return data;
}
