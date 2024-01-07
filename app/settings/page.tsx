'use client';

import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { getAccountInfo, IAccount } from '@/app/actions';

const initialState: IAccount = {
	name: ''
};

export default function Page() {
	const [state, formAction] = useFormState(getAccountInfo, initialState);
	const { pending } = useFormStatus();

	return (
		// <div className="w-full max-w-xs">
		// 	<h1>Settings</h1>

		// 	<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action={formAction}>
		// 		<input
		// 			className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
		// 			type="text"
		// 			name="accessToken"
		// 		/>
		// 		<button type="submit" aria-disabled={pending} className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] flex items-center gap-3">
		// 			Set access token
		// 		</button>
		// 	</form>

		// 	<hr />

		// 	<h1>Account Name: {state?.name}</h1>
		// </div>

		<div>
			<form action={formAction}>
				{/* <div className="space-y-12">
					<div className="border-b border-gray-900/10 pb-12">
						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div className="sm:col-span-4">
								<div className="mt-2">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
										<input
											type="text"
											name="accessToken"
											id="accessToken"
											autoComplete="accessToken"
											className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
											placeholder="Access Token"
										/>

<button
						type="submit"
						aria-disabled={pending}
						className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Store
					</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div> */}

				<div>
					<input
						type="text"
						name="accessToken"
						id="accessToken"
						autoComplete="accessToken"
						className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
						placeholder="Access Token"
					/>

					<button
						type="submit"
						aria-disabled={pending}
						className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Store
					</button>
				</div>
			</form>

			<h1>Account Name: {state?.name}</h1>
		</div>
	);
}
