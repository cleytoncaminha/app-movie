import { PaginatedListShelf } from "@startapp/mobx-utils"

 export interface IMovie {
    title: string
    poster_path: string
    id: number
}

export interface IMovieDetails{
    title: string
    poster_path: string
    overview: string | null
    vote_average: number
}

export interface IButton{
    value: string
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export interface IForm{
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

export interface IMovieList{
    initialList: PaginatedListShelf<IMovie>
    search: string
    filteredList: IMovie[]
    imageUrl: string
}

export interface IMovieFiltered {
    filteredList: IMovie[]
    imageUrl: string
}

export interface IMovieInitial {
    initialList: PaginatedListShelf<IMovie>
    imageUrl: string
}