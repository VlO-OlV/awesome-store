import { useEffect } from 'react';

export const useDebounceEffect = (
	callback: () => void,
	delay: number,
	dependencies: any[],
) => {
	useEffect(() => {
		const handler = setTimeout(callback, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [...dependencies, delay]);
};
