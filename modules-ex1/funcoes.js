module.exports=(x)=>{
    var par = ()=> x%2 == 0? true: false;
    return{
        msg:"Ovalor é par?",
        value:par()
    }
}