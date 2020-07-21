# @uppercod/request

Generate a GET request to the given url, the request function is able to consume the url, returning the url response url and its body.

## Install

```
npm install @uppercod/request
```

## Motivation

I can't find a Package that allowed knowing the respect url between redirects. If you know one, let me know.

## Case of use

```js
let [url, body] = await request("http://unpkg.com/atomico");

url; // https://unpkg.com/atomico@0.23.3/core.js
```
