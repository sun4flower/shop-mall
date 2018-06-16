function jsonp(url, names) {
    return new Promise((resolve, reject) => {
        window[names] = function (data) {
            resolve(data)
        }
        let script = document.createElement("script")
        script.src = url;
        document.body.appendChild(script)
    })

}
export default jsonp;