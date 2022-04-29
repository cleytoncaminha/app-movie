import { useEffect, useState } from "react";


const useDebounce = (value: string, delay?: number): string => {
	const [debouncedValue, setDebouncedValue] = useState<string>(value);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedValue(value), delay || 2000);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
};

export default useDebounce;
