
export interface IAPIMovie {
	backdrop_path: any;
	title: string;
	poster_path: string;
	id: string;
	vote_average: number;
}

export interface IMovie extends IAPIMovie{
	favorite: boolean;
}

interface IGenre {
	name: string;
	id: string;
}

export interface IMovieDetails{
	title: string;
	poster_path: string;
	overview: string | null;
	vote_average: number;
	genres: IGenre[];
	backdrop_path: string;
	release_date: string;
	popularity: number;
}
