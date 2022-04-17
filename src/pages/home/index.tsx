import React, { ChangeEvent, useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { IMovie } from '../../interface/interface';
import { searchMovies } from '../../service';
import { Button } from '../../components/button';
import { Form } from '../../components/form';
import { MovieList } from '../../components/movieList';
import { Loading } from '../../components/loader';
import "./home.css"
import { observer, useLocalObservable } from 'mobx-react-lite';
import { Store } from './store';

const Home = () => {
    const store = useLocalObservable(() => new Store());
    


    const ImageUrl: string = "https://image.tmdb.org/t/p/w300"

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

    
    return (
        <>
            <header>
                <h1 className='title'>Movie App</h1>
                <div className="pages">

                    <Button onClick={() => { store.listShelf.page > 1 ? store.listShelf.previousPage() : setNumberPage(numberPage) }} value="<" />
                    <h3 className='page'>Página: {store.listShelf.page} de 10</h3>
                    <Button onClick={() => { store.listShelf.page < 10 ? store.listShelf.nextPage() : setNumberPage(numberPage) }} value=">" />
                </div>

            </header>
            <main>
                <Form onChange={handleInputChange} value={search} />
                {store.listShelf.loader.isLoading === false ? <MovieList initialList={store.listShelf} filteredList={filteredList} search={search} imageUrl={ImageUrl} /> : <Loading />}
            </main>
        </>
    );
}

export default observer(Home)