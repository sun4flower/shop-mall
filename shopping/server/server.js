let express = require("express")
let app =new express()
let api = require("./api")
let bodyParser = require("body-parser")
let path = require("path")
var history = require("connect-history-api-fallback");

// app.use(history({
//     rewrites: [
//       {
//         from: /^\/index\/.*$/,
//         to: function(context) {
//             console.log(context.parsedUrl.path)
//             return context.parsedUrl.path
//         }
//       }
//     ]
//   }))
app.use(history({
    index: '/index.html'
  }))
app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, "../")))
// app.use((req, res) => {
//     res.status(404).send('File not found!')
// })
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

app.get('/', function (req, res, next) {
    res.render('index', { title: 'HTML' });
});
app.get('/indexs/home', function (req, res, next) {
    res.render('index', { title: 'HTML' });
});


api(app)
app.listen(3000, function () {

})