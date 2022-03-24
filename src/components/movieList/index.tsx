import { IMovie } from "../../interface/interface"

const ImageUrl: string = "https://image.tmdb.org/t/p/w300"

export const MovieList = (props:any)=>{
    return(
        <div>
                    {
                    props.search === "" ? props.initialList.map((item: IMovie, index: number) => {
                        return (
                            <div key={index}>
                                <h1>{item.title}</h1>
                                <img src={ImageUrl + item.poster_path} alt={item.title}></img>
                            </div>
                        )
                    }) : props.filteredList.map((item: IMovie, index: number) => {
                        return (
                            <div key={index}>
                                <h1>{item.title}</h1>
                                <img src={ImageUrl + item.poster_path} alt={item.title}></img>
                            </div>
                        )
                    })
                    }
                </div>
    )
}