let url = require("url");
let user = [{ username: "zs", password: "123" }];
let jwt = require("jsonwebtoken");
let path = require("path");
let fs = require("fs");
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "./upload"))
    },
    filename: function (req, file, cb) {
        let pathname = file.originalname.split(".")
        cb(null, pathname[0] + '-' + Date.now() + "." + pathname[1])
    }
})

var upload = multer({ storage: storage })
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
                let list = JSON.parse(fs.readFileSync(pathname, 'utf-8'))
                res.json({
                    code: 1,
                    msg: "success",
                    data: list[decoded.username] || []
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
                            if (i.wname == req.body.item.wname) {
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
                    if (i.wname == req.body.item.wname) {
                        ++i.count;
                        return true;
                    } else {
                        return false;
                    }
                });
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
    app.post("/subNum", (req, res) => {
        jwt.verify(req.body.token, "1601E", (err, decoded) => {
            if (err) {
                res.json({ code: 0, msg: err })
            } else {
                let pathname = path.join(__dirname, "./mock/cart.json")
                let list = JSON.parse(fs.readFileSync(pathname, 'utf-8'));
                let status = list[decoded.username].some(i => {
                    if (i.wname == req.body.item.wname) {
                        if (i.count <= 1) {
                            i.count = 1;
                        }
                        --i.count;
                        return true;
                    } else {
                        return false;
                    }
                });
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
    app.post("/cancel", (req, res) => {
        jwt.verify(req.body.token, "1601E", (err, decoded) => {
            if (err) {
                res.json({ code: 0, msg: err })
            } else {
                let pathname = path.join(__dirname, "./mock/cart.json")
                let list = JSON.parse(fs.readFileSync(pathname, 'utf-8'));
                let status = list[decoded.username].some(i => {
                    if (i.wname == req.body.item.wname) {
                        i.book = !i.book;
                        return true;
                    } else {
                        return false;
                    }
                });
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
    app.post("/delete", (req, res) => {
        jwt.verify(req.body.token, "1601E", (err, decoded) => {
            if (err) {
                res.json({ code: 0, msg: err })
            } else {
                let pathname = path.join(__dirname, "./mock/cart.json")
                let list = JSON.parse(fs.readFileSync(pathname, 'utf-8'));
                let arr = []
                list[decoded.username].map((item, ind) => {
                    req.body.id.map(i => {
                        if (item.wname == i) {
                            arr.push(ind)
                        }
                    })
                })
                let newarr = []
                let str = ""
                arr.map(i => {
                    newarr.push(list[decoded.username].slice(i, i + 1)[0])
                })
                list[decoded.username] = newarr;
                fs.writeFile(pathname, JSON.stringify(list), (err) => {
                    if (err) {
                        res.json({ code: 0, msg: err })
                    } else {
                        res.json({ code: 1, msg: "success" })
                    }
                })

            }
        })
    })
    app.post("/addaddr", (req, res) => {
        jwt.verify(req.body.token, "1601E", (err, decoded) => {
            if (err) {
                res.json({ code: 0, msg: err })
            } else {
                let pathname = path.join(__dirname, "./address/newaddr.json")
                let list = JSON.parse(fs.readFileSync(pathname, 'utf-8'));
                if (list[decoded.username]) {
                    if (req.body.data.id) {
                        let arr = [];
                        list[decoded.username].map((i, ind) => {
                            if (i.id == req.body.data.id) {
                                list[decoded.username][ind] = req.body.data
                                return i
                            }
                        })
                    } else {
                        let o = {
                            id: list[decoded.username].length + 1,
                            ...req.body.data
                        }
                        list[decoded.username].push(o)
                    }
                } else {
                    list[decoded.username] = [{ id: 1, ...req.body.data }]
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
    })
    app.post("/getaddr", (req, res) => {
        jwt.verify(req.body.token, "1601E", (err, decoded) => {
            if (err) {
                res.json({ code: 0, msg: err })
            } else {
                let pathname = path.join(__dirname, "./address/newaddr.json")
                let list = JSON.parse(fs.readFileSync(pathname, 'utf-8'));
                res.json({ code: 1, msg: list[decoded.username] || [] })

            }
        })
    })
    app.post("/deleteaddr", (req, res) => {
        jwt.verify(req.body.token, "1601E", (err, decoded) => {
            if (err) {
                res.json({ code: 0, msg: err })
            } else {
                let pathname = path.join(__dirname, "./address/newaddr.json")
                let list = JSON.parse(fs.readFileSync(pathname, 'utf-8'));
                let index = null;
                let status = list[decoded.username].some((i, ind) => {
                    if (i.id == req.body.data.id) {
                        index = ind;
                        return true;
                    }
                })
                if (status) {
                    list[decoded.username].splice(index, 1)
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
    app.post("/getOrder", (req, res) => {
        jwt.verify(req.body.token, "1601E", (err, decoded) => {
            if (err) {
                res.json({ code: 0, msg: err })
            } else {
                let pathname = path.join(__dirname, `./order/${req.body.type}.json`);
                let list = JSON.parse(fs.readFileSync(pathname, 'utf-8'));

                res.json({ code: 1, msg: list[decoded.username] || [] })

            }
        })
    })
    app.post("/getUser", (req, res) => {
        jwt.verify(req.body.token, "1601E", (err, decoded) => {
            if (err) {
                res.json({ code: 0, msg: err })
            } else {
                res.json({ code: 1, msg: "登录中" })

            }
        })
    })

    app.post("/getImage", (req, res) => {
        fs.readdir("./upload/", (err, chunk) => {
            chunk.map((i, ind) => {
                if (ind == chunk.length-1) {
                    return res.json({
                        code: 1,
                        data: "http://localhost:3000/server/upload/" + i
                    })
                }
            })

        })
    })
    app.post("/setImage", upload.single('img'), (req, res) => {
        img="http://localhost:3000/server/upload/" + req.file.filename;
        res.json({
            code: 1,
            data: "http://localhost:3000/server/upload/" + req.file.filename
        })

    })
}