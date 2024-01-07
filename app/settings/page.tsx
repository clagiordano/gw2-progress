// 'use client';

import { revalidatePath } from "next/cache";

// import { useState } from 'react';

export default function Setings() {
	// const [accessToken, setAccessToken] = useState(null);

	async function setAccessToken(formData: FormData) {
		'use server';

		const rawFormData = {
			accessToken: formData.get('accessToken'),
		};

		// mutate data
		// revalidate cache

        console.log('form', rawFormData)
        revalidatePath('/settings')
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
