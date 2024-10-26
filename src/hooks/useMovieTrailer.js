import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { TMDB_API_KEY } from "../utils/constant";

const useMovieTrailer = (movieId) => {
    const trailerVideo = useSelector(store => store.movies?.trailerVideo);
    const dispatch = useDispatch();
    const getMovieVideo = async () => {
        // const data = await fetch('https://api.themoviedb.org/3/movie/365177/videos?language=en-US', API_OPTIONS);
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`);
        const json = await data?.json();
        console.log('json: ', json);
        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        console.log('trailer: ', trailerVideo);
        dispatch(addTrailerVideo
            (trailer));
    }
    useEffect(() => {
        getMovieVideo();
    }, [])
}

export default useMovieTrailer;