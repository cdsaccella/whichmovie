### Run with deno

`deno run --allow-net --allow-read --allow-write ./index.js`

### Run with docker

`docker build -t app . && docker run -it --init -p 8080:8080 app`

### Deploy

`flyctl deploy`

`flyctl info`

`flyctl open`
