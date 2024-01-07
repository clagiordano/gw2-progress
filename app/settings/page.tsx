const baseURL = 'https://api.guildwars2.com/v2';
const baseConfig = {
	headers: {
		'Content-Type': 'application/json'
	}
};

export default function Page() {
	async function getAccountInfo(token: string) {
		'use server';

		const options = { ...baseConfig, headers: { ...baseConfig.headers, Authorization: `Bearer ${token}` } };
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

	async function setAccessToken(formData: FormData) {
		'use server';

		const accessToken = formData.get('accessToken') as string;
		// mutate data
		// revalidate cache

		const info = await getAccountInfo(accessToken);
		console.log('resp', info);
	}

	return (
		<div className="w-full max-w-xs">
			<h1>Settings</h1>
			<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action={setAccessToken}>
				<input
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					type="text"
					name="accessToken"
				/>
				<button type="submit">Save token</button>
			</form>
		</div>
	);
}
