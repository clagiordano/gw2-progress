import ProgressBar from '@/components/progressbar';

export default function Page() {
	return (
		<div>
			<h1 className="text-3xl font-bold underline">Hello, Next.js!</h1>
			<button
				type="button"
				data-ripple-light="true"
				className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
			>
				Button
			</button>
		</div>
	);
}
