import Bars from './Bars';
import Control from './Control';
import 'blissfuljs';

const endpoint = "//pb-api.herokuapp.com/bars";
const container = $("#progress-bars");
const request = $.fetch(endpoint, {
    method: "GET",
    responseType: "json"
})
    .then(xhr =>
    {
        const json = xhr.response;
        const bars = new Bars(json, container);
        const controls = new Control(bars, container);
    })
    .catch(function (error)
    {
        console.error(error, "code: " + error.status);
    });