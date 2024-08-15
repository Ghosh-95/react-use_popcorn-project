import { key } from "../../key.js";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const DATA_URL = `http://www.omdbapi.com/?apikey=${key}`;
