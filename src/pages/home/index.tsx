import React, { ChangeEvent, useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { IMovie } from '../../interface/interface';
import { getMovies, searchMovies } from '../../service';
import { Button } from '../../components/button';
import { Form } from '../../components/form';
import { MovieList } from '../../components/movieList';
import { Loading } from '../../components/loader';

export const Home = () => {
    
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
                const moviesFilters: any = await searchMovies(search)
                setFilteredList(moviesFilters)
                setRemoveLoading(true)

            }
            fetchData()
            
        }
        
        filterListMovies(debouncedValue)
        
    }, [debouncedValue])


    useEffect(() => {

        async function fetchData() {
            const response: any = await getMovies(numberPage)
            setInitialList(response)
            setRemoveLoading(true)
        }

        fetchData()
    }, [numberPage])

    
    return (
        <div>
            <header>
                    <Form onChange={handleInputChange} value={search}></Form>
                    {numberPage > 1 ? <Button onClick={() => { setNumberPage(numberPage - 1) }} value="<" /> : ""}
                    {numberPage < 6 ? <Button onClick={() => { setNumberPage(numberPage + 1) }} value=">" /> : ""}
            </header>
            <main>
                    {removeLoading === true || search === "" ? <MovieList initialList={initialList} filteredList={filteredList} search={search}></MovieList> : <Loading></Loading>}
            </main>
        </div>
    );
}