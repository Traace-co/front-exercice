import axios from 'axios';
import { Movie } from './type';

interface FetchMoviesResponse {
  movies: Movie[];
  total: number;
}

const API_URL = 'http://localhost:5173/api';

export const fetchMovies = async (): Promise<FetchMoviesResponse> => {
  //const response = await axios.get(`${API_URL}?page=${page}${genre ? `&genre=${genre}` : ''}`);
  const response = await axios.get(`${API_URL}`);
  return response.data as FetchMoviesResponse;
};

export const fetchMoviesTable = async (
  page: number,
  pageSize: number,
  genre?: string
): Promise<FetchMoviesResponse> => {
  // Construct the query parameters
  const params: { [key: string]: any } = {
    page : page,
    pageSize : pageSize,
    genre: genre
  };

  if (genre) {
    params.genre = genre;
  }

  console.log("cheeeecccc page : ", page);
  console.log("cheeeecccc pageSize : ", pageSize);
  console.log("cheeeecccc genre : ", genre);

  const response = await axios.get(`${API_URL}?page=${page} ?pageSize=${pageSize} ${genre ? `&genre=${genre}` : ''}`);

  return {
    movies: response.data.movies,
    total: response.data.total,
  };
};

export const fetchMovies2 = async (page: number, pageSize: number, genre?: string): Promise<Movie[]> => {
  const response = await axios.get(`${API_URL}?page=${page}${genre ? `&genre=${genre}` : ''}`);
  return response.data;
};