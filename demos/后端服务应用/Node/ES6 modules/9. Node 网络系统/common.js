// 获取 URL 参数
export function getUrlParams(name, url) {
    const reg = new RegExp('(^|&|#|/?)' + name + '=([^&]*)(&|$)', 'i');
    const r = url.substr(1).match(reg);
    if (r != null) {
        let result = unescape(r[2]);
        if (result.indexOf('#') > 0) {
            result = result.slice(0, result.indexOf('#'));
        }
        return result;
    }
    return null;
}