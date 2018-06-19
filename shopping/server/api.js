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
        jwt.verify(req.body.token, "1601E", (err, decoded) => {
            if (err) {
                res.json({
                    code: 0,
                    msg: err
                })
            } else {
                let pathname = path.join(__dirname, "./mock/cart.json")
                let list = JSON.parse(fs.readFileSync(pathname, 'utf-8'));
                res.json({
                    code: 1,
                    msg: "success",
                    data: list[decoded.username]
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
            } else {
                res.json({
                    code: 1,
                    msg: "success"
                })
            }
        })
    })
    app.post("/addCart", (req, res) => {
        if (req.body.token == null) {
            res.json({ code: 2, msg: "请登录" })
        } else {
            jwt.verify(req.body.token, "1601E", (err, decoded) => {
                if (err) {
                    res.json({ code: 0, msg: "登录超时，请重新登录" })
                } else {
                    let pathname = path.join(__dirname, "./mock/cart.json")
                    let list = JSON.parse(fs.readFileSync(pathname, 'utf-8'))
                    if (list[decoded.username]) {
                        let status = list[decoded.username].some(i => {
                            if (i.sid == req.body.item.sid) {
                                ++i.count;
                                return true;
                            } else {
                                return false;
                            }
                        });
                        if (!status) {
                            let obj = {
                                count: 1,
                                ...req.body.item
                            }
                            list[decoded.username].push(obj)
                        }

                    } else {
                        list[decoded.username] = [{ count: 1, ...req.body.item }]
                    }
                    fs.writeFile(pathname, JSON.stringify(list), (err) => {
                        if (err) {
                            res.json({ code: 0, msg: err })
                        } else {
                            res.json({ code: 1, msg: "success" })
                        }
                    })
                }

            })
        }

    })
    app.post("/addNum", (req, res) => {
        jwt.verify(req.body.token, "1601E", (err, decoded) => {
            if (err) {
                res.json({ code: 0, msg: err })
            } else {
                let pathname = path.join(__dirname, "./mock/cart.json")
                let list = JSON.parse(fs.readFileSync(pathname, 'utf-8'));
                let status = list[decoded.username].some(i => {
                    if (i.sid == req.body.item.sid) {
                        ++i.count;
                        return true;
                    } else {
                        return false;
                    }
                })

                if (status) {
                    fs.writeFile(pathname, JSON.stringify(list), (err) => {
                        if (err) {
                            res.json({ code: 0, msg: err })
                        } else {
                            res.json({ code: 1, msg: "success" })
                        }
                    })
                }
            }
        })
    })

}