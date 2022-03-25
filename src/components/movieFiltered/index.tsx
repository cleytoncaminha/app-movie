import { Link } from "react-router-dom"
import { IMovie, IMovieFiltered } from "../../interface/interface"
import  "./movieFiltered.css"

export const MoviesFiltered = (props: IMovieFiltered) => {
    return (
        <>
            {
               props.filteredList.length > 0 ? props.filteredList.map((item: IMovie, index: number) =>
                (
                    <div className="card" key={index}>
                        <Link to={`/movie/${item.id}`} ><img className="image" src={props.imageUrl + item.poster_path} alt={item.title}></img></Link>
                    </div>
                )
                ) : <h1 className="notFound">Filme não encontrado</h1>
            }

        </>
    )
}
