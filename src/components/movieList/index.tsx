import { Link } from "react-router-dom"
import { IMovie } from "../../interface/interface"
import "./movieList.css"

const ImageUrl: string = "https://image.tmdb.org/t/p/w300"

interface IMovieList{
    initialList: IMovie[]
    search: string
    filteredList: IMovie[]
}

export const MovieList = (props:IMovieList)=>{

    return(
        <div className="container">
                    {
                    props.search === "" ? props.initialList.map((item: IMovie, index: number) => {
                        return (
                            <div className="card" key={index}>
                                <Link to={`/movie/${item.id}`} ><img className="image" src={ImageUrl + item.poster_path} alt={item.title}></img></Link>
                            </div>
                        )
                    }) : props.filteredList.map((item: IMovie, index: number) => {
                        return (
                            <div className="card" key={index}>
                                <Link to={`/movie/${item.id}`} ><img className="image" src={ImageUrl + item.poster_path} alt={item.title}></img></Link>
                            </div>
                        )
                    })
                    }
                </div>
    )
}