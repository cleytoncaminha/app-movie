import React, { ChangeEvent, useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { IMovie } from '../../interface/interface';
import { getMovies, searchMovies } from '../../service';
import { Button } from '../../components/button';
import { Form } from '../../components/form';
import { MovieList } from '../../components/movieList';
import { Loading } from '../../components/loader';
import "./home.css"

export const Home = () => {

    const ImageUrl: string = "https://image.tmdb.org/t/p/w300"

    const [initialList, setInitialList] = useState<IMovie[]>([])
    const [numberPage, setNumberPage] = useState<number>(1)
    const [search, setSearch] = useState<string>("")
    const [filteredList, setFilteredList] = useState<IMovie[]>([])
    const [removeLoading, setRemoveLoading] = useState<boolean>(false)

    const debouncedValue = useDebounce<string>(search, 2000)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
        setRemoveLoading(false)
    }

    useEffect(() => {

        const filterListMovies = (search: string) => {

            if (search === "") return;

            async function fetchData() {
                const moviesFilters = await searchMovies(search)
                setFilteredList(moviesFilters)
                setRemoveLoading(true)

            }
            fetchData()

        }

        filterListMovies(debouncedValue)

    }, [debouncedValue])


    useEffect(() => {
        setRemoveLoading(false)

        async function fetchData() {
            const response = await getMovies(numberPage)
            setInitialList(response)
            setRemoveLoading(true)
        }

        fetchData()
    }, [numberPage])

    return (
        <>
            <header>
                <h1 className='title'>Movie App</h1>
                <div className="pages">

                    <Button onClick={() => { numberPage > 1 ? setNumberPage(numberPage - 1) : setNumberPage(numberPage) }} value="<" />
                    <h3 className='page'>Página: {numberPage} de 10</h3>
                    <Button onClick={() => { numberPage < 10 ? setNumberPage(numberPage + 1) : setNumberPage(numberPage) }} value=">" />
                </div>

            </header>
            <main>
                <Form onChange={handleInputChange} value={search} />
                {removeLoading === true || search === "" ? <MovieList initialList={initialList} filteredList={filteredList} search={search} imageUrl={ImageUrl} /> : <Loading />}
            </main>
        </>
    );
}