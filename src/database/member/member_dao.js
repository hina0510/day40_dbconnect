const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.autoCommit = true;
/*
    oracledb.outFormat = oracledb.OBJECT;
    설정하지 않으면 2차원 배열로 들어오기 떄문에 KEY, VALUE를 사용할 수 없다
    설정하면 1차원 배열에 [{}, {}..]형식으로 들어온다
    즉, KEY, VALUE를 사용해 정보를 가져올 수 있다
*/
oracledb.outFormat = oracledb.OBJECT;
const getMember = async (id)=>{
    const con = await oracledb.getConnection(dbConfig);
    const sql = `select * from members02 where id='${id}'`;
    let member;
    try{
        member = await con.execute(sql);
    }catch(err){
        console.log(err);
    }
    return member;
}
const memberList = async()=>{
    const con = await oracledb.getConnection(dbConfig);
    const sql="select * from members02";
    return (await con.execute(sql)).rows;
}
const infoMember = async (mId)=>{
    const con = await oracledb.getConnection(dbConfig);
    console.log("dao info", mId);
    const sql = "select * from members02 where id=:id";
    let member;
    try{
        member = await con.execute(sql, mId);
    }catch(err){
        console.log(err);
    }
    return member.rows[0];
}
const insert = async(body)=>{
    const con = await oracledb.getConnection(dbConfig);
    const sql="insert into members02(id, pwd, name, addr) values(:id, :pwd, :name, :addr)";
    let result=0;
    try{
        result = await con.execute(sql, body);
    }catch(err){
        console.log(err);
    }
    return result;
}
const update = async(mId)=>{
    const con = await oracledb.getConnection(dbConfig);
    const sql="select * from members02 where id=:id";
    try{
        member = await con.execute(sql, mId);
    }catch(err){
        console.log(err);
    }
    return member.rows[0];
}
const modify = async(body)=>{
    const con = await oracledb.getConnection(dbConfig);
    const sql="update members02 set pwd=:pwd, name=:name, addr=:addr where id=:id";
    let result=0;
    try{
        result = await con.execute(sql, body);
    }catch(err){
        console.log(err);
    }
    return result;
}
const deleteMember = async(mId)=>{
    const con = await oracledb.getConnection(dbConfig);
    const sql="delete from members02 where id=:id";
    let result=0;
    try{
        result = await con.execute(sql, mId);
    }catch(err){
        console.log(err);
    }
    return result;
}

module.exports = {getMember, memberList, infoMember, update, modify, insert, deleteMember};