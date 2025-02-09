type Movie = {
    id:string;
    title:string;
    ratings:number[];
}


let Movies:Movie[] = []

const addMovie = ( movies:Movie[], newMovie:Movie): Movie[]  =>  {
    let movieList = [...movies]
    movieList.push(newMovie)
    return movieList;
}


const rateMovie = (movies:Movie[], movieId:string,rating:number) : Movie[] => {

    // FIND THE FILM 
    const movieIndex = movies.findIndex((item)=> item.id === movieId)
    // UPDATE THIS FILM
    if (movieIndex !== -1) {
        movies[movieIndex] = {
            ...movieIndex[movieIndex],
            ratings: [...movies[movieIndex].ratings, rating]
        }
    }
    // RETURN THE LIST
    return movies;
}

const getAverageRating = (movies:Movie[], movieId:string): number | null => {

    const movie = movies.find((item)=> item.id === movieId)
    if(!movie || movie.ratings.length === 0 ) return null


    const sum = movie.ratings.reduce((acc , rating)=> acc + rating, 0);
    return sum / movie.ratings.length
}


const getTopRatedMovie = (movies: Movie[]): Movie | null => {
    if (movies.length === 0) return null;

    return movies.reduce((top, movie) => {
        const topAvg = getAverageRating(movies, top.id) ?? 0;
        const movieAvg = getAverageRating(movies, movie.id) ?? 0;
        return movieAvg > topAvg ? movie : top;
    }, movies[0]);
};