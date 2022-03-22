class Controller {
    constructor(ctx) {
        this.ctx = ctx;
    }

    /**
     * @description 设置响应数据
     * @param ret
     * @param message
     * @param dataInfo
     * @param httpStatus
     */
    resApi(ret, message, dataInfo, httpStatus=200) {
        return this.setResInfo(this.ctx, ret, message, dataInfo, httpStatus);
    }

    /**
     * @description 设置响应数据
     * @param object res http res
     * @param boolean ret boolean
     * @param string message string
     * @param object dataInfo object
     * @param int httpStatus
     */
    setResInfo(res, ret, message, dataInfo, httpStatus=200) {
        let retInfo = {};
        if(!ret) {
            retInfo = {
                'ret' : -1,
                'message' : message ? message : 'error',
                'data' : {}
            };
        } else {
            retInfo = {
                'ret' : 0,
                'message' : message ? message : 'success',
                'data' : dataInfo ? dataInfo : {}
            };
        }
        res.writeHead(httpStatus, { 'Content-Type': 'text/plain' });
        res.write(JSON.stringify(retInfo));
        res.end();
        return;
    }
}

export default Controller;