import test from "ava";
import http from "http";

import { request } from "../esm.js";

const port = 8080;
const url = `http://localhost:` + port;
const server = http.createServer(({ url }, res) => {
    if (url == "/") {
        res.writeHead(200);
    } else {
        res.writeHead(302, {
            Location: "/",
        });
    }
    res.end(url);
});

test.before(async () => {
    server.listen(port);
});

test("simple request", async (t) => {
    let [uri, data] = await request(url);

    t.is(uri, url);

    t.is(data, "/");
});

test("request with redirect", async (t) => {
    let [uri, data] = await request(url + "/any/folder");

    t.is(uri, url + "/");

    t.is(data, "/");
});

test.after(() => {
    server.close();
});
