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