import url from "url";
import http from "http";
import https from "https";
import descompress from "decompress-response";
/**
 * Genera un request que a su vez retorna la ultima url respuesta
 * @param {string} uri - url to generate the request
 * @param {number} [limitRedirect] - limits of redirects in the recursive process
 * @returns {Promise<[string,string,import("http").IncomingMessage]>}
 */
export let request = (uri, limitRedirect = 5) =>
    new Promise((resolve, reject) => {
        let dataUri = new url.URL(uri);
        let fn = dataUri.protocol == "https:" ? https : http;
        fn.get(uri, { headers: { "user-agent": "node.js" } }, (res) => {
            res = descompress(res);
            res.setEncoding("utf8");
            let chunks = [];
            res.on("data", (chunk) => chunks.push(chunk));
            res.on("end", () => {
                let data = chunks.join("");
                if (
                    res.statusCode > 300 &&
                    res.headers.location &&
                    --limitRedirect
                ) {
                    // recursively resolve the redirect
                    request(
                        url.resolve(uri, res.headers.location),
                        limitRedirect
                    ).then(resolve, reject);
                } else {
                    resolve([uri, data, res]);
                }
            });
        }).on("error", reject);
    });
