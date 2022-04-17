import { Link } from "react-router-dom"
import { IMovie, IMovieInitial } from "../../interface/interface"

export const MoviesInitial = (props: IMovieInitial) => {
    return (
        <>
            {
                props.initialList.items.map((item: IMovie, index: number) =>
                (
                    <div className="card" key={index}>
                        <Link to={`/movie/${item.id}`} ><img className="image" src={props.imageUrl + item.poster_path} alt={item.title} /></Link>
                    </div>
                )
                )
            }

        </>
    )
}
