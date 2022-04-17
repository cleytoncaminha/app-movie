import { observer, useLocalObservable } from "mobx-react-lite"
import { Link, useParams } from "react-router-dom"
import { Loading } from "../../components/loader"
import "./movieDetails.css"
import { Store } from "./store"


const MoviesDetails = () => {
    const ImageUrl: string = "https://image.tmdb.org/t/p/w300"
    const { id } = useParams();

    const store = useLocalObservable(() => new Store(id));

    return (
        <div className="containerMovieDetail">

            {
            store.fetchModel.model.value ?
                <>
                    <header>
                        <h1 className="title">{store.fetchModel.model.value.title}</h1>
                        <h1 className="logo">Movie App</h1>
                    </header>
                    <main>
                        <div className="containerDetailMain">
                            <img src={ImageUrl + store.fetchModel.fetchedModel.poster_path} alt={store.fetchModel.model.value.title} className="imageDetail"></img>
                            <div className="content">
                                <p>{store.fetchModel.fetchedModel.overview}</p>
                                <div className="contentContainer">
                                   <div>⭐{store.fetchModel.fetchedModel.vote_average}</div> 
                                    <Link to="/"> <button className="buttonMovieDetail">Home</button> </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </>
            : <Loading/>
            }
        </div>
    )
}

export default observer(MoviesDetails)