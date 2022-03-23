import React, { ChangeEvent, useEffect, useState } from 'react';
import { getMovies, searchMovies } from './service';

function App() {
  const ImageUrl: string = "https://image.tmdb.org/t/p/w300"

  const [initialList, setInitialList] = useState<any>([])
  const [numberPage, setNumberPage] = useState<number>(1)
  const [search, setSearch] = useState<string>("")
  const [filteredList, setFilteredList] = useState<any>([])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    filterListMovies(event.target.value)
  }

  const filterListMovies = (search: string) => {
    if (search === "") return;

    async function fetchData() {
      const moviesFilters: any = await searchMovies(search)
      setFilteredList(moviesFilters)

    }

    fetchData()
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
        {numberPage > 1 ? <button type="button" onClick={() => { setNumberPage(numberPage - 1) }}>pagina anterior</button> : ""}
        <h1>{numberPage}</h1>
        {numberPage < 6 ? <button type="button" onClick={() => { setNumberPage(numberPage + 1) }}>proxima pagina</button> : ""}
      </div>
      {search !== "" ? filteredList.map((item: any, index: number) => {
        return (
          <div key={index}>
            <h1>{item.title}</h1>
            <img src={ImageUrl + item.poster_path}></img>
          </div>
        )
      }) : initialList.map((item: any, index: number) => {
        return (
          <div key={index}>
            <h1>{item.title}</h1>
            <img src={ImageUrl + item.poster_path} ></img>
          </div>
        )
      })}


    </div>
  );
}

export default App;