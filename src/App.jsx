import { useEffect, useState } from "react";

import { DATA_URL, tempMovieData, tempWatchedData } from "./data.js.js";
import Navbar, { Results, SearchInput } from "./components/Navbar.jsx";
import MoviesList from "./components/LeftBox.jsx";
import Box from "./components/Box.jsx";
import { WatchSummery, WatchedMoviesList, SelectedMovie } from "./components/WatchBox.jsx";
import Loader from "./components/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";

export default function App() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState(function () {
        const storedMovies = JSON.parse(localStorage.getItem("watchedMovies"));
        return storedMovies;
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedMovieID, setSelectedMovieID] = useState(null);


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

        fetchMovieData();

        return () => {
            controller.abort();
        }
    }, [query]);



    function handleSelectMovieID(id) {
        setSelectedMovieID(curId => curId === id ? null : id);
    };

    function handleCloseMovieID() {
        setSelectedMovieID(null);
    };

    function handleAddWatched(movie) {
        setWatched(watched => [...watched, movie]);
    };

    function handleDeleteWatched(id) {
        setWatched(watched => watched.filter(movie => movie.imdbID !== id));
    }

    return (
        <>
            <Navbar movies={movies}>
                <SearchInput query={query} setQuery={setQuery} />
                <Results movies={movies} />
            </Navbar>

            <main className="main">
                <Box >
                    {isLoading && <Loader />}
                    {!isLoading && !error && <MoviesList movies={movies} onSelectMovieID={handleSelectMovieID} />}
                    {error && <ErrorMessage message={error} />}
                </Box>

                <Box>
                    {selectedMovieID ? <SelectedMovie selectedMovieID={selectedMovieID} onCloseMovieID={handleCloseMovieID} onAddWatched={handleAddWatched} watched={watched} /> : (
                        <>
                            <WatchSummery watched={watched} />
                            <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
                        </>
                    )}
                </Box>

            </main>
        </>
    );
}