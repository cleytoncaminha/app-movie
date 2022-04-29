import { IAPIMovie } from "../interface/interface";

const ApiKey = "b8631ce6585f8712833dab184716894b";
const BaseUrl = "https://api.themoviedb.org/3";
const ApiUrl: string = BaseUrl + "/discover/movie?sort_by=popularity.desc&language=pt-BR&page=";

export const getMovies = async  (page = 1): Promise<IAPIMovie[]> => {
	const response = await fetch(`${ApiUrl + page}&api_key=${ApiKey}`);
	const json = await response.json();

	return json.results;
};

export const getSearchedMovies = async  (query: string): Promise<IAPIMovie[]> => {
	const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=b8631ce6585f8712833dab184716894b&language=pt-BR&query=${query}`);
	const json = await response.json();

	return json.results;
};

export const getMoviesDetails = async  (id?: string) => {
	const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${ApiKey}&language=pt-BR`);
	const json = await response.json();

	return json;
};

export const getMostRatedMovies = async  (): Promise<IAPIMovie[]> => {
	const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${ApiKey}&language=pt-BR&page=1`);
	const json = await response.json();

	return json.results;
};
