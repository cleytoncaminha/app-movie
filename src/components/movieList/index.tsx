import { IMovieList } from "../../interface/interface"
import { MoviesFiltered } from "../movieFiltered"
import { MoviesInitial } from "../moviesInitial"
import "./movieList.css"


export const MovieList = (props:IMovieList)=>{

    return(
        <div className="containerMovieList">
                    {
                    props.search === "" ? <MoviesInitial initialList={props.initialList} imageUrl={props.imageUrl} /> : <MoviesFiltered filteredList={props.filteredList} imageUrl={props.imageUrl} />
                    }
                </div>
    )
}