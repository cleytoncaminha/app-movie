import { FetchModelShelf } from "@startapp/mobx-utils";
import { makeAutoObservable } from "mobx";
import { IMovieDetails } from "../../interface/interface";
import { getMoviesDetails } from "../../service";

export class Store {
	public fetchModel: FetchModelShelf<IMovieDetails>;

	constructor(id: string) {
		makeAutoObservable(this);
		this.fetchModel = new FetchModelShelf(
			id, () => getMoviesDetails(id),
			{
				fetchOnConstructor: true,
			});
	}
}
