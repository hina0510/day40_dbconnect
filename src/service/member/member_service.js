const memberDAO = require("../../database/member/member_dao");

const loginCheck = async (body)=>{
    let member = await memberDAO.getMember(body.id);
    console.log("=== ser loginCheck ===");
    console.log(member);
    let msg="", url="", msgPack={};
    if(member.rows.length===1){
        member = member.rows[0]
        if(member.PWD==body.pwd){
            msg=member.NAME+"님 환영합니다";
            url="/";
            msgPack.result=0;//로그인 한 경우에만 생성
        }else{
            msg="비밀번호가 틀렸습니다";
            url="/member/login";
        }
    }else{//해당하는 id가 존재하지 않을 경우
        msg="해당하는 id가 존재하지 않습니다";
        url="/member/login";
    }
    msgPack.msg = getMessage(msg, url);//script를 msg에 저장
    return msgPack;
}

const memberList = ()=>{
    return memberDAO.memberList();
}
const infoMember = async (mId)=>{
    const member = await memberDAO.infoMember(mId);
    return member;
}
const update = (mId)=>{
    return memberDAO.update(mId);
}
const modify = async(body)=>{
    const result = await memberDAO.modify(body);
    let msg="", url="";
    if(result==0){
        msg="문제 발생";
        url="/member/modify_form?id="+body.id;
    }else{
        msg="수정되었습니다";
        url="/member/info?id="+body.id;
    } 
    return getMessage(msg, url);
}
const register = async(body)=>{
    const result = await memberDAO.insert(body);
    let msg="", url="";
    if(result==0){
        msg="문제 발생";
        url="/member/register";
    }else{
        msg="가입되었습니다";
        url="/";
    } 
    return getMessage(msg, url);
}
const deleteMember = async(mId)=>{
    const result = await memberDAO.deleteMember(mId);
    let msg="", url="";
    if(result==0){
        msg="문제 발생";
        url="/member/modify_form?id="+mId;
    }else{
        msg="삭제되었습니다";
        url="/";
    } 
    return getMessage(msg, url);
}
const getMessage = (msg, url)=>{
    return `<script>
        alert("${msg}");
        location.href="${url}";
    </script>`;
}

module.exports = {loginCheck, memberList, infoMember, update, modify, register, deleteMember}