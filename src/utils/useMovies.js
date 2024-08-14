import { useEffect, useState } from "react";
import { DATA_URL } from "./data";

export function useMovies(query, callback) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        const controller = new AbortController();
        async function fetchMovieData() {
            try {
                setIsLoading(true);
                setError('');

                const response = await fetch(`${DATA_URL}&s=${query}`, { signal: controller.signal });

                if (!response.ok) throw new Error("Something went wrong while fetching data!");

                const data = await response.json();
                if (data.Response === 'False') throw new Error("Movie not found");

                setMovies(data.Search);
                setError('');
            } catch (error) {
                if (error.name !== "AbortError") {
                    setError(error.message);
                }
            } finally {
                setIsLoading(false);
            };
        };

        if (query.length < 3) {
            setMovies([]);
            setError('');
            return;
        };

        callback?.();
        fetchMovieData();

        return () => {
            controller.abort();
        }
    }, [query]);

    return { movies, isLoading, error };

};