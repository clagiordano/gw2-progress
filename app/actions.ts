'use server';

import { cookies } from 'next/headers'
import { IAccount } from "@/models/IAccount";

const baseURL = 'https://api.guildwars2.com/v2';
const baseConfig = {
	headers: {
		'Content-Type': 'application/json'
	}
};

export async function getAccountInfo(): Promise<IAccount> {
	// const accessToken = formData.get('accessToken') as string;

	//setToken(accessToken);
	const accessToken = await getToken();
	console.log('token', accessToken)

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

export const getToken = async () => {
	console.log('get token')
	const cookieStore = cookies()

	const token = await cookieStore.get('accessToken')?.value ?? '';
	console.log('get token end', token);

	return token;
}

export const setToken = (value: string) => {
	console.log('store token')
	const cookieStore = cookies()
	cookieStore.set('accessToken', value);

	console.log('store token end')
}
