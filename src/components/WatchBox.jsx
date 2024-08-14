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
                    <span>{avgImdbRating.toFixed(1)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating.toFixed(1)}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime.toFixed(1)} min</span>
                </p>
            </div>
        </div>
    )
}

export function WatchedMoviesList({ watched, onDeleteWatched }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovies movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched} />
            ))}
        </ul>

    );
};

export function SelectedMovie({ selectedMovieID, onCloseMovieID, onAddWatched, watched }) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(0);

    const isRated = watched.map(movie => movie.imdbID).includes(selectedMovieID);
    const watchedUserRating = watched.find(movie => movie.imdbID === selectedMovieID)?.userRating;

    useEffect(function () {
        setIsLoading(true);
        fetchMovieByID();
    }, [selectedMovieID]);

    useEffect(function () {
        document.title = `Movie | ${movie.Title}`;

        // cleanup function
        return () => {
            document.title = "usePopCorn";
        };
    }, [movie.Title]);

    async function fetchMovieByID() {
        const response = await fetch(`${DATA_URL}&i=${selectedMovieID}`);
        const data = await response.json();

        setMovie(data);
        setIsLoading(false);
    };

    function handleAdd() {
        const newMovieObj = {
            imdbID: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            imdbRating: Number(movie.imdbRating),
            runtime: Number(movie.Runtime.split(' ').at(0)),
            poster: movie.Poster,
            userRating,
        };

        onAddWatched(newMovieObj);
        onCloseMovieID();
    };

    useEffect(function () {
        function callback(e) {
            if (e.code === "Escape") {
                onCloseMovieID();
            };
        };

        document.addEventListener('keydown', callback);

        return function () {
            document.removeEventListener('keydown', callback)
        };
    }, [onCloseMovieID]);

    useEffect(() => {
        localStorage.setItem("watchedMovies", JSON.stringify(watched));
    }, [watched]);

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
                            {isRated ? <p>You have rated this movie with ⭐<span className="bold">{watchedUserRating.toFixed(1)}</span></p> :
                                <>
                                    <StarRating size={24} maxRating={10} onSetRating={setUserRating} />
                                    {userRating > 0 && <button className="btn-add" onClick={handleAdd}>+Add to List</button>}
                                </>
                            }
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

export function WatchedMovies({ movie, onDeleteWatched }) {
    return (
        <li >
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
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
                <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>X</button>
            </div>
        </li>
    )
}