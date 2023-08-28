const express = require("express");
const app = express();
const bodyParser = require("body-parser");//router 위에 설정
app.use(bodyParser.urlencoded({extended:true}));//router 위에 설정

const session = require("express-session");
const sessionConfig = require("./config/cookie_session/cookie_session_config");
app.use(session(sessionConfig.sessionConfig));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const router = require("./src/routers/router")(app);

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/", router);

//app.get("/", (req, res)=>{res.send("연결")});

app.listen(3000, ()=>{console.log("3000 server")});