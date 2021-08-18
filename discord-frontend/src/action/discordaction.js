export const userinfo = user =>{
    return{
        type:'USER_INFO',
        payload:user
    }
}
export const userlogout=()=>{
    return{
        type:'USER_LOGOUT',
        
    }
}
export const setchannel=(channel)=>{
    return{
        type:'SET_CHANNEL',
        payload:channel
    }
}
