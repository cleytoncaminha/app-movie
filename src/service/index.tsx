const ApiKey: string = "b8631ce6585f8712833dab184716894b"
const BaseUrl: string = "https://api.themoviedb.org/3"
const ApiUrl: string = BaseUrl + "/discover/movie?sort_by=popularity.desc&language=pt-BR&page="

export const getMovies = async function (page: number = 1) {
    const response = await fetch(`${ApiUrl + page}&api_key=${ApiKey}`);
    const json = await response.json();
    return json.results
}

export const searchMovies = async function (query:string) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=b8631ce6585f8712833dab184716894b&language=pt-BR&query=${query}`);
    const json = await response.json();
    return json.results
}

export const moviesDetails = async function (id?:string) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${ApiKey}&language=pt-BR`);
    const json = await response.json();
    return json
}
