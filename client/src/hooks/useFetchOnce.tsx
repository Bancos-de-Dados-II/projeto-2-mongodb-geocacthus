import { useEffect, useRef } from "react"

export const useFetchOnce = (fetchFunction: () => Promise<void>) => {
    const fetched = useRef(false);

    useEffect(() => {
        if (fetched.current) return;
        fetched.current = true;

        fetchFunction();
    }, [fetchFunction]);
}