import { Router } from 'https://deno.land/x/oak/mod.ts';

import getMovies from './controllers/movies/get.js';

const router = new Router();

router.get('/', ({ response }) => {
    response.body = 'Movies list rest api using deno runtime v3.0';
});

router
    .get('/movies', getMovies);

export default router;