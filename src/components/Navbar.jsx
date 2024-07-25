import { useState } from "react";

export default function Navbar({ children }) {
    return (
        <nav className="nav-bar">
            <Logo />
            {children}
        </nav>
    );
};

export function SearchInput() {
    const [query, setQuery] = useState("");
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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