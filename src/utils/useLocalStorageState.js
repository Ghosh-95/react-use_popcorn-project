import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
    const [value, setValue] = useState(function () {
        const storedMovies = JSON.parse(localStorage.getItem(key));
        return storedMovies || initialState;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}