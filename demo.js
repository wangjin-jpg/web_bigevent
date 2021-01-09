function debounce(func, wait, immediate) {
    let timeout, result;
    let decounced = function() {
        let context = this;
        let args = arguments;
        clearTimeout(timeout)
        if (immediate) {
            let callNow = !timeout;
            timeout = setTimeout(function() {
                timeout = null
            }, wait);
            // 立即执行
            if (callNow) result = func.apply(context, args)
        } else {
            // 不会立即执行
            timeout = setTimeout(function() {
                func.apply(context, args)
            }, wait)
        }
        return result
    }
    debounced.cancel = function() {
        clearTimeout(timeout)
        timeout = null
    }
    return decounced
}