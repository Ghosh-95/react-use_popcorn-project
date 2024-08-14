import { useEffect, useRef } from "react";

export default function Navbar({ children }) {
    return (
        <nav className="nav-bar">
            <Logo />
            {children}
        </nav>
    );
};

export function SearchInput({ query, setQuery }) {
    const inputElem = useRef(null);

    useEffect(() => {
        function callback(e) {

            if (document.activeElement === inputElem.current) return;

            if (e.code === "Enter") {
                inputElem.current.focus();
                setQuery("");
            }
        };

        document.addEventListener("keydown", callback);

        return () => document.addEventListener("keydown", callback);

    }, [setQuery]);

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputElem}
        />
    )
};

function Logo() {
    return <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
    </div>
};

export function Results({ movies }) {

    return <p className="num-results">
        Found <strong>{movies.length}</strong> results
    </p>
};