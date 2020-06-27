import { FILE_PATH } from '../../config.js';
import { getRandomMovie } from '../../services/movies/moviesService.js'

export default async ({ response }) => {
    try {
        // const movies = await Deno.readFile(FILE_PATH);
        const movies = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=74bdb07887921e662b11335e580869ba&language=en-US&page=1', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await movies.json();
        response.body = { status: 'success', data: [getRandomMovie(data)] };
    } catch (error) {
        console.log(error);
        response.status = 500;
        response.body = { status: 'failed', data: [] };
    }
};
