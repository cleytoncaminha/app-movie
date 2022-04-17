import { FetchModelShelf } from "@startapp/mobx-utils";
import { makeAutoObservable } from "mobx";
import { IMovieDetails } from "../../interface/interface";
import { moviesDetails } from "../../service";

export class Store {
    fetchModel: FetchModelShelf<IMovieDetails>;

    constructor(id?: string) {
        makeAutoObservable(this);
        this.fetchModel = new FetchModelShelf
            (
                id, (id) => moviesDetails(id),
                {
                    fetchOnConstructor: true
                }
            );
    }

}