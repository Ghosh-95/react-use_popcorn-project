import { useEffect, useState } from "react";
import { average, DATA_URL } from "../data.js.js";
import StarRating from "./StarRating.jsx";
import Loader from "./Loader.jsx";

export function WatchSummery({ watched }) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    )
}

export function WatchedMoviesList({ watched }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovies movie={movie} key={movie.imdbID} />
            ))}
        </ul>

    );
};

export function SelectedMovie({ selectedMovieID, onCloseMovieID }) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(function () {
        setIsLoading(true);
        fetchMovieByID();
    }, [selectedMovieID]);

    async function fetchMovieByID() {
        const response = await fetch(`${DATA_URL}&i=${selectedMovieID}`);
        const data = await response.json();

        setMovie(data);
        setIsLoading(false);
    };

    return (
        <div className="details">
            {isLoading ? <Loader /> : (
                <>
                    <header>
                        <button onClick={onCloseMovieID} className="btn-back">&larr;</button>
                        <img src={movie.Poster} alt={`An image of ${movie.Title} movie`} />

                        <div className="details-overview">
                            <h2>{movie.Title}</h2>
                            <p>
                                {movie.Released} &bull; {movie.Runtime}
                            </p>
                            <p>
                                <span className="bold">⭐{movie.imdbRating}</span> IMDb Rating
                            </p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">
                            <StarRating size={24} maxRating={10} />
                        </div>
                        <p>
                            <em>{movie.Plot}</em>
                        </p>
                        <p>Starring <span className="italic bold">{movie.Actors}</span></p>
                        <p>Directed by <span className="italic bold">{movie.Director}</span></p>
                        <p>Written by <span className="italic bold">{movie.Writer}</span></p>
                    </section>
                </>
            )}
        </div>
    )
}

export function WatchedMovies({ movie }) {
    return (
        <li >
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
            </div>
        </li>
    )
}