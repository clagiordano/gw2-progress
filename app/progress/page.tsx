'use client';
import ProgressBar from '@/components/progressbar';
import { useState, useEffect } from 'react';

export default function Test() {
	return (
		<div>
			<h1>test progress bar</h1>
			<ProgressBar percentage={47} label='test bar'/>
		</div>
	);
}
