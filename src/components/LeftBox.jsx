export default function MoviesList({ movies, onSelectMovieID }) {

    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movies movie={movie} key={movie.imdbID} onSelectMovieID={onSelectMovieID} />
            ))}
        </ul>
    );
};

function Movies({ movie, onSelectMovieID }) {
    return (
        <li onClick={() => onSelectMovieID(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    )
}