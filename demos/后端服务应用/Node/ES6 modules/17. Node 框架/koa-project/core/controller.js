import baseRes from '../util/baseRes.js'

class Controller {
    constructor(ctx) {
        this.ctx = ctx;
    }

    /**
     * @description 设置响应数据
     * @param object res http res
     * @param boolean ret boolean
     * @param string message string
     * @param object dataInfo object
     * @param int httpStatus
     */
    resApi(ret, message, dataInfo, httpStatus=200) {
        return baseRes.setResInfo(this.ctx, ret, message, dataInfo, httpStatus);
    }
}

export default Controller;