import http from "http";

export const server = http.createServer(({ url }, res) => {
    if (url == "/") {
        res.writeHead(200);
    } else {
        res.writeHead(302, {
            Location: "/",
        });
    }
    res.end(url);
});
