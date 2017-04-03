class JSONResponse {
    constructor(errCode = 0, errMsg = '', data = {}) {
        this.errCode = errCode;
        this.errMsg = errMsg;
        this.data = data;
    }
}
module.exports = {
    resObject: (errCode, errMsg, data) => new JSONResponse(errCode, errMsg, data),
    code: {
        success: 0,
        error: -1
    }
};
