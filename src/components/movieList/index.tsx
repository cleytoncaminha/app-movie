import { Link } from "react-router-dom"
import { IMovie, IMovieList } from "../../interface/interface"
import "./movieList.css"

const ImageUrl: string = "https://image.tmdb.org/t/p/w300"

export const MovieList = (props:IMovieList)=>{

    return(
        <div className="containerMovieList">
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