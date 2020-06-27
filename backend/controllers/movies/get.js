import { getPopularMovies, getRandomMovie } from '../../services/movieService.js'

export default async ({ response }) => {
    try {
        const data = await getPopularMovies();
        response.body = { status: 'success', data: [getRandomMovie(data)] };
    } catch (error) {
        console.log(error);
        response.status = 500;
        response.body = { status: 'failed', data: [] };
    }
};
