import {Message} from "element-ui";

const defaultErrHandler = function (err) {
    if (err.response) {
        if (err.response.status === 401) {
            return;
        }
        let errInfo = err.response.data.err;
        if (errInfo !== undefined) {
            Message({
                    message: '' + errInfo.msg,
                    duration: 2000,
                    offset: 500
                }
            );
        } else {
            Message({
                message: '' + err.response.data,
                duration: 2000,
                offset: 500
            });
        }
    } else if (err.request) {
        Message({
                message: '' + err.request,
                duration: 2000,
                offset: 500
            }
        );
    } else {
        console.log("error: " + err);
    }
}

export default defaultErrHandler;