let express = require("express")
let app = express()
let api = require("./api")
let bodyParser=require("body-parser")
app.use(bodyParser.json())
app.all("*", (req, res, next) => {
    res.header({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-PINGOTHER, Content-Type",
        'Access-Control-Allow-Methods': 'POST'
    })

    next()
})
api(app)
app.listen(3000, function () {

})