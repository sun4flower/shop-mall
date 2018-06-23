let express = require("express")
let app = express()
let api = require("./api")
let bodyParser=require("body-parser")
let path=require("path")
app.use(bodyParser.json())
app.all("*", (req, res, next) => {
    res.header({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-PINGOTHER, Content-Type",
        'Access-Control-Allow-Methods': 'POST'
    })
    next()
})
//2、引入ejs
var ejs = require('ejs');  //我是新引入的ejs插件
//3、设置html引擎
app.engine('html', ejs.__express);
//设置视图引擎
app.set('view engine', 'html');
//console.log(path.resolve(__dirname)
app.use(express.static(path.resolve(__dirname,"../")))
app.get('/index/',function(req, res, next){
    res.render('index', {title: 'HTML'});
  });
api(app)
app.listen(3000, function () {

})