import _ from 'lodash';

function getBaseApiUrl() {
    let storyBookBaseUrl = process.env.STORYBOOK_SERVER_BASE_URL;
    if (!_.isNil(storyBookBaseUrl))
        return storyBookBaseUrl;
    return null;
}

const fetchWithTimeOut = (url, options, timeout = 20000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Server request timed out")), timeout)
        )
    ]);
};

const fetchFactory = (endpoint, method = "GET", params, responseModifier, cb, errorHandler) =>
    fetchWithTimeOut(endpoint, {"method": method, ...params})
        .then(responseModifier)
        .then((responseModifier) => {
            if (!_.isNil(responseModifier.error) || (!_.isNil(responseModifier.httpStatusCode) && responseModifier.httpStatusCode > 400))
                errorHandler(responseModifier);
            else
                cb(responseModifier);
        })
        .catch((error) => {
            console.log("requests", "fetchFactory, errorHandler", error);
            errorHandler(error);
        });

const makeHeader = (type) => new Map(
    [['json', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }],
        ['text', {
            headers: {'Accept': 'text/plain', 'Content-Type': 'text/plain'}
        }]]).get(type);


let _get = (endpoint, cb, errorHandler) => {
    console.log('requests', `GETing from ${endpoint}`);
    return fetchFactory(endpoint, "GET", makeHeader("json"), (response) => response.json(), cb, errorHandler);
};

let _getText = (endpoint, cb, errorHandler) =>
    fetchFactory(endpoint, "GET", makeHeader("json"), (response) => response.text(), cb, errorHandler);

export let post = (endpoint, body, cb, errorHandler) => {
    let fullPath = `${baseApiUrl}/${endpoint}`;
    console.log('requests', `POSTing to ${fullPath}`);
    return fetchFactory(fullPath, "POST", {body: JSON.stringify(body), ...makeHeader("json")}, (response) => {
        return response.json();
    }, cb, errorHandler);
};

export let put = (endpoint, body, cb, errorHandler) => {
    let fullPath = `${baseApiUrl}/${endpoint}`;
    console.log('requests', `PUTing to ${fullPath}`);
    return fetchFactory(fullPath, "PUT", {body: JSON.stringify(body), ...makeHeader("json")}, (response) => {
        return response.json();
    }, cb, errorHandler);
};

export let get = (endpoint, cb, errorHandler) => {
    return new Map([[true, _get], [false, _getText]]).get(endpoint.endsWith(".json"))(endpoint, cb, errorHandler);
};

export let getJSON = (endpoint, cb, errorHandler) => {
    if (errorHandler === undefined) {
        errorHandler = (arg) => {
        };
    }
    return _get(endpoint, cb, errorHandler);
};
