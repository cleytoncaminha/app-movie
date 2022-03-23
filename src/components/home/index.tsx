import React, { ChangeEvent, useEffect, useState } from 'react';
import { IMovie } from '../../interface/interface';
import { getMovies, searchMovies } from '../../service';
import { Button } from '../button';

export const Home = () => {

    const ImageUrl: string = "https://image.tmdb.org/t/p/w300"

    const [initialList, setInitialList] = useState<IMovie[]>([])
    const [numberPage, setNumberPage] = useState<number>(1)
    const [search, setSearch] = useState<string>("")
    const [filteredList, setFilteredList] = useState<IMovie[]>([])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
        filterListMovies(event.target.value)
    }

    const filterListMovies = (search: string) => {
        setTimeout(() => {
            if (search === "") return;

            async function fetchData() {
                const moviesFilters: any = await searchMovies(search)
                setFilteredList(moviesFilters)
                console.log(search)
            }
            fetchData()

        }, 2000)
    }

    useEffect(() => {

        async function fetchData() {
            const response: any = await getMovies(numberPage)
            setInitialList(response)

        }

        fetchData()

    }, [numberPage])


    return (
        <div className="App">
            <div>
                <form>
                    <div>
                        <label htmlFor="search">Procure seu filme favorito </label>
                        <input type="text" name="search" id="search" onChange={handleInputChange} value={search} />
                    </div>
                </form>
                {numberPage > 1 ? <Button onClick={() => { setNumberPage(numberPage - 1) }} value="<" /> : ""}
                {numberPage < 6 ? <Button onClick={() => { setNumberPage(numberPage + 1) }} value=">" /> : ""}
            </div>
            <div>
                {search !== "" ? filteredList.map((item: IMovie, index: number) => {
                    return (
                        <div key={index}>
                            <h1>{item.title}</h1>
                            <img src={ImageUrl + item.poster_path}></img>
                        </div>
                    )
                }) : initialList.map((item: IMovie, index: number) => {
                    return (
                        <div key={index}>
                            <h1>{item.title}</h1>
                            <img src={ImageUrl + item.poster_path} ></img>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
