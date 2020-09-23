// 立即执行版
module.exports = function debounce(fn, wait) {
    var timeout = null;

    var debounced = function () {
        // 用that保存dom2级事件处理中绑定的元素对象
        // arg保存默认传给事件处理程序的参数
        var that = this,
            arg = arguments;
        var callNow = !timeout;

        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null
        }, wait)
        if (callNow) {
            fn.apply(that, arg);
        };
    }
    return debounced;

}