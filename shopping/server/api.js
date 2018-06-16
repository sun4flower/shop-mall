let url = require("url");
let user = [{ username: "zs", password: "123" }];
let jwt = require("jsonwebtoken");
let path = require("path");
let fs = require("fs");
module.exports = function (app) {
    app.post("/user/register", (req, res) => {
        let listPath = path.join(__dirname, "/mock/data.json")
        let list = JSON.parse(fs.readFileSync(listPath).toString())
        let status = list.some(i => {
            if (i.username == req.body.username) {
                return true;
            } else {
                return false;
            }
        });
        if (status) {
            return res.json({ code: 0, msg: "用户已存在" })
        } else {
            list.push(req.body)
            fs.writeFile(listPath, JSON.stringify(list), (err) => {
                if (err) {
                    //console.log(err)
                } else {
                    return res.json({ code: 1, msg: "注册成功" })
                }
            })
        }

    })
    app.post("/user", (req, res) => {
        let listPath = path.join(__dirname, "/mock/data.json")
        let list = JSON.parse(fs.readFileSync(listPath).toString())
        let status = list.some(i => {
            if (i.username == req.body.username) {
                return true;
            } else {
                return false;
            }
        });
        if (status) {
            let token = jwt.sign(req.body, "1601E")
            res.send({ code: 1, msg: "登录成功", token })
        } else {
            res.send({ code: 0, msg: "账号或密码错误" })
        }
    });
    app.post("/getShopitem", (req, res) => {
        jwt.verify(req.body.token, "1601E", (err) => {
            if (err) {
                res.json({
                    code: 0,
                    msg: err
                })
            }else{
                res.json({
                    code:1,
                    msg: "success"
                })
            }
        })
    });
    app.post("/getAddress", (req, res) => {
        jwt.verify(req.body.token, "1601E", (err) => {
            if (err) {
                res.json({
                    code: 0,
                    msg: err
                })
            }else{
                res.json({
                    code:1,
                    msg: "success"
                })
            }
        })
    })
   
   
}