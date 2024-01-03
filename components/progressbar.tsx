interface Props {
	percentage: number;
	label: string;
}
const ProgressBar = ({ percentage = 0, label = 'N/A'}: Props) => {
	return (
		<div className="flex w-full h-4 overflow-hidden font-sans text-xs font-medium rounded-full flex-start bg-blue-gray-50">
			<div className={`flex items-center justify-center h-full overflow-hidden text-white break-all bg-gray-900 rounded-full`}
            style={{width: `${percentage}%` }}>
				{label} {percentage}% Completed
			</div>
		</div>
	);
};
export default ProgressBar;
