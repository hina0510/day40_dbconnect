module.exports=(app)=>{
    const memberRouter = require("./member/member_router");
    
    app.use("/member", memberRouter);

    const router = require("express").Router();
    router.get("/",(req, res)=>{
        if(req.session.username){
            res.cookie("isLogin", true);
        }
        res.render("index", {username:req.session.username});//기본 페이지에 들어가야 적용됨
        //res.send("router 연결");
    });
    return router;
}