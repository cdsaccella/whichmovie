import { Router } from 'https://deno.land/x/oak/mod.ts';

import getRiddle from './controllers/riddle/get.js'
import postRiddle from './controllers/riddle/post.js'

const router = new Router();

router.get('/', ({ response }) => {
    response.body = 'You shouldn\'t be here, but meh...';
});

router.get('/health', ({ response }) => {
    response.body = "Don't worry, I'm alive.";
});

router
    .get('/riddles/:lang', getRiddle)
    .post("/riddles", postRiddle);

export default router;