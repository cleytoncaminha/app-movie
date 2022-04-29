import { makeAutoObservable } from "mobx";
import { IAPIMovie, IMovie } from "../../interface/interface";
import { AttributeShelf, InfinityScrollShelf, PaginatedListShelf} from "@startapp/mobx-utils";
import { getMostRatedMovies, getMovies, getSearchedMovies } from "../../service";

export class Store {
	public listShelf: InfinityScrollShelf<IMovie>;
	public search: AttributeShelf<string>;
	public moviesByRated: PaginatedListShelf<IAPIMovie>;
	public bannerImage: AttributeShelf<string>;

	constructor() {
		this.search = new AttributeShelf("");
		this.listShelf = new InfinityScrollShelf(
			async (page) => {
				let movies: IAPIMovie[] = [];
				const moviesFavorite = JSON.parse(localStorage.getItem("moviesID"));

				if (this.search.value) {
					movies = await getSearchedMovies(this.search.value);
				} else {
					movies = await getMovies(page + 1);
				}

				return movies.map((movie) => {
					const movieFavorite: boolean = moviesFavorite.includes(movie.id);

					return {
						...movie,
						favorite: movieFavorite,
					};
				});
			},
			{ fetchOnConstructor: true },
		);
		this.moviesByRated = new PaginatedListShelf(
			() => getMostRatedMovies(),
			{ fetchOnConstructor: true },
		);
		this.bannerImage = new AttributeShelf("");

		makeAutoObservable(this);
	}

	public setFavorite = (movie: IMovie): string[] => {
		const arrayFilter = (arr: string[], moviesID: string): string[] => arr.filter((item) => item !== moviesID);

		movie.favorite= !movie.favorite;
		let arrayFavorite: string[] = JSON.parse(localStorage.getItem("moviesID")) || [];
		if (movie.favorite === true) {
			arrayFavorite.push(movie.id);
			localStorage.setItem("moviesID",JSON.stringify(arrayFavorite));

			return arrayFavorite;
		} else {
			arrayFavorite = arrayFilter(arrayFavorite, movie.id);
			localStorage.setItem("moviesID",JSON.stringify(arrayFavorite));

			return arrayFavorite;
		}
	};
}
