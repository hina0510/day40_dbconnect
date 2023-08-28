const router = require("express").Router();
const memberCtrl = require("../../controller/member/member_ctrl");

//router.get("/", (req, res)=>{res.send("member 연동")});
router.get("/login", memberCtrl.login);
router.post("/login_check", memberCtrl.loginCheck);
router.get("/logout", memberCtrl.logout);
router.get("/list", memberCtrl.list);
router.get("/info", memberCtrl.info);
router.get("/register_form", memberCtrl.registerForm);
router.post("/register", memberCtrl.register);
router.get("/modify_form", memberCtrl.modifyForm);
router.post("/modify", memberCtrl.modify);
router.get("/delete", memberCtrl.deleteMember);

module.exports=router;