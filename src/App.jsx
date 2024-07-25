import { useState } from "react";

import { tempMovieData, tempWatchedData } from "./data.js.js";
import Navbar, { Results, SearchInput } from "./components/Navbar.jsx";
import MoviesList from "./components/LeftBox.jsx";
import Box from "./components/Box.jsx";
import { WatchSummery, WatchedMoviesList } from "./components/WatchBox.jsx";

export default function App() {
    const [movies, setMovies] = useState(tempMovieData);
    const [watched, setWatched] = useState(tempWatchedData);


    return (
        <>
            <Navbar movies={movies}>
                <SearchInput />
                <Results movies={movies} />
            </Navbar>

            <main className="main">
                <Box >
                    <MoviesList movies={movies} />
                </Box>

                <Box>
                    <WatchSummery watched={watched} />
                    <WatchedMoviesList watched={watched} />
                </Box>

            </main>
        </>
    );
}