import { useEffect, useRef } from "react";
import { useKey } from "../utils/useKey";

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

    useKey("Enter", function () {
        if (document.activeElement === inputElem.current) return;
        inputElem.current.focus();
        setQuery("");
    });

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