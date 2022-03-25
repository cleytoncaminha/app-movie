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
    initialList: IMovie[]
    search: string
    filteredList: IMovie[]
}