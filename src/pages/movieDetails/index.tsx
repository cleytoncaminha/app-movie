import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Loading } from "../../components/loader"
import { IMovieDetails } from "../../interface/interface"
import { moviesDetails } from "../../service"
import "./movieDetails.css"

export const MoviesDetails = () => {
    const ImageUrl: string = "https://image.tmdb.org/t/p/w300"
    const [movie, setMovie] = useState<IMovieDetails>()
    const { id } = useParams()

    useEffect(() => {

        async function fetchData() {
            const response = await moviesDetails(id)
            setMovie(response)

        }

        fetchData()
        console.log(movie)
    }, [])

    return (
        <div className="containerMovieDetail">

            {movie === undefined ? <Loading></Loading> :
                <div>
                    <header>
                        <h1 className="title">{movie.title}</h1>
                        <h1 className="logo">Movie App</h1>
                    </header>
                    <main>
                        <div className="containerDetailMain">
                            <img src={ImageUrl + movie.poster_path} alt={movie.title} className="imageDetail"></img>
                            <div className="content">
                                <p>{movie.overview}</p>
                                <div className="contentContainer">
                                   <div>⭐{movie.vote_average}</div> 
                                    <Link to="/"> <button className="buttonMovieDetail">Home</button></Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            }
        </div>
    )
}