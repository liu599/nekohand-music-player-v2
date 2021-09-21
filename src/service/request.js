import request from "umi-request";
const queryString = require('query-string');

const _errorHandler = (error) => {
    const codeMap = {
        '10001': "错误10001",
        // ....
    };
    let code = '10001';
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.status);
        // console.log(error.response.headers);
        // code = error.data.split(" ")[1].substr(0, 5);
        console.log(error.data, code);
        // console.log(error.request);
        // console.log(codeMap[error.data.status])
        // console.log(codeMap[code])
    } else {
        // The request was made but no response was received or error occurs when setting up the request.
        console.log(error.message);
    }


    // throw error; // If throw. The error will continue to be thrown.
    // throw error
    return Promise.resolve({
        error,
    })
};

async function FetchSources(params) {
    const url = params[0];
    const option = params[1];

    let data = option.data || {};
    const requestType = option.requestType || "FORM";
    const method = option.method.toUpperCase() || "GET";
    if (method === "POST") {
         data = queryString.stringify(data);
    }
    let par2 = {
        requestType,
        method,
        errorHandler: option.errorHandler || _errorHandler,
        params: data,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: data,
    }
    if (method === "GET" || data === "") {
        delete par2.body
    }
    if (method === "POST" || data === "") {
        delete par2.params
    }
    // console.log(par2, "parameter");
    return request(url, par2)
}

export default FetchSources;
