import { useEffect, useState } from "react";

import { DATA_URL } from "./utils/data.js";
import Navbar, { Results, SearchInput } from "./components/Navbar.jsx";
import MoviesList from "./components/LeftBox.jsx";
import Box from "./components/Box.jsx";
import { WatchSummery, WatchedMoviesList, SelectedMovie } from "./components/WatchBox.jsx";
import Loader from "./components/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import { useMovies } from "./utils/useMovies.js";
import { useLocalStorageState } from "./utils/useLocalStorageState.js";

export default function App() {
    const [query, setQuery] = useState("");
    const [watched, setWatched] = useLocalStorageState([], "watchedMovies");
    const [selectedMovieID, setSelectedMovieID] = useState(null);
    const { movies, isLoading, error } = useMovies(query, handleCloseMovieID);

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