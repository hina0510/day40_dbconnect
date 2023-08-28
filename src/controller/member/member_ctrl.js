const ser = require("../../service/member/member_service");

const login = (req, res)=>{
    res.render("member/login", {username:req.session.username});//세션 정보 입력
}
const loginCheck = async(req, res)=>{
    console.log("=== ctrl loginCheck ===");
    console.log(req.body);
    const msgPack = await ser.loginCheck(req.body);
    console.log("msgPack : ", msgPack);
    if(msgPack.result===0){
        req.session.username = req.body.id;
    }
    res.send(msgPack.msg);
}
const logout = (req, res)=>{
    req.session.destroy();
    res.clearCookie("isLogin");
    res.redirect("/");
}
const list = async(req, res)=>{
    const mList = await ser.memberList();
    res.render("member/list", {username:req.session.username, list:mList}); // 세션 요청방식(1) 모든 필요한 정보 직접 받아옴
}
const info = async(req, res)=>{
    const member = await ser.infoMember(req.query);
    //console.log("ctrl member : ",member);
    res.render("member/info", {username:req.session.username, member:member});
}
const modifyForm = async (req,res) => {
    const member = await ser.update(req.query);
    //console.log("ctrl modify : ", member);
    res.render("member/modify", {username:req.session.username, member});
}
const modify = async(req, res)=>{
    console.log("ctrl modify : ",req.body);
    const msg = await ser.modify(req.body);
    res.send(msg);
}
const deleteMember = async(req, res)=>{
    const msg = await ser.deleteMember(req.query);
    res.send(msg);
}
const registerForm = async (req,res) => {
    res.render("member/register", {username:req.session.username});
}
const register = async(req, res)=>{
    const msg = await ser.register(req.body);
    res.send(msg);
}

module.exports = {login, loginCheck, logout, list, info, modifyForm, modify, registerForm, register, deleteMember};