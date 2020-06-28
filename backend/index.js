import { Application } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import { PORT } from './config.js';
import router from './router.js';

const app = new Application();
app.use(
    oakCors({
        origin: "*"
    }),
);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(({ response }) => {
    response.status = 404;
    response.body = { status: 'Not Found' };
});

console.log(`Server is running in ${PORT} \nOpen: http://localhost:${PORT}`);

await app.listen({ port: PORT });