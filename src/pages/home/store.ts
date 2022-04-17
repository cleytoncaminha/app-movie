import { makeAutoObservable } from "mobx";
import { IMovie } from "../../interface/interface";
import { PaginatedListShelf } from "@startapp/mobx-utils";
import { getMovies } from "../../service";

export class Store {
    listShelf: PaginatedListShelf<IMovie>;
    
    constructor() {
        makeAutoObservable(this);
        this.listShelf = new PaginatedListShelf
        (
            (page:number) => getMovies(page + 1),
            {
                fetchOnConstructor: true
            }
        )
    }

    public search: string = "";
}