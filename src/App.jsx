import { useEffect, useState } from "react";

import { DATA_URL, tempMovieData, tempWatchedData } from "./data.js.js";
import Navbar, { Results, SearchInput } from "./components/Navbar.jsx";
import MoviesList from "./components/LeftBox.jsx";
import Box from "./components/Box.jsx";
import { WatchSummery, WatchedMoviesList } from "./components/WatchBox.jsx";
import Loader from "./components/Loader.jsx";

export default function App() {
    const [query, setQuery] = useState("inception");
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState(tempWatchedData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        if (query.length < 3) {
            setMovies([]);
            setError('');
            return;
        };

        fetchMovieData();
    }, [query]);

    async function fetchMovieData() {
        try {
            setIsLoading(true);
            setError('');

            const response = await fetch(`${DATA_URL}&s=${query}`);

            if (!response.ok) throw new Error("Something went wrong while fetching data!");

            const data = await response.json();
            if (data.Response === 'False') throw new Error("Movie not found");

            setMovies(data.Search);

        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        };
    };


    function ErrorMessage({ message }) {
        return <p style={{ fontSize: "2rem", position: "absolute", left: "35%", top: "40%" }}>{message} ⚠️</p>
    };


    return (
        <>
            <Navbar movies={movies}>
                <SearchInput query={query} setQuery={setQuery} />
                <Results movies={movies} />
            </Navbar>

            <main className="main">
                <Box >
                    {isLoading && <Loader />}
                    {!isLoading && !error && <MoviesList movies={movies} />}
                    {error && <ErrorMessage message={error} />}
                </Box>

                <Box>
                    <WatchSummery watched={watched} />
                    <WatchedMoviesList watched={watched} />
                </Box>

            </main>
        </>
    );
}