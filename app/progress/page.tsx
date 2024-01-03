'use client';
import ProgressBar from '@/components/progressbar';
import { useState, useEffect } from 'react';

export default function Test() {
	const [progress, setProgress] = useState(0);
	// Simula gli aggiornamenti di progresso
	useEffect(() => {
		const timerId = setInterval(() => {
			setProgress(prevProgress => {
				if (prevProgress >= 100) {
					clearInterval(timerId);
					return prevProgress;
				}
				return prevProgress + 10;
			});
		}, 1000);
		return () => clearInterval(timerId);
	}, []);
	return (
		<div>
			<h1>La mia App Barra di Progresso</h1>
			<ProgressBar percentage={progress} label='test bar'/>
		</div>
	);
}
