const initialState={
    user:null,
    
}
export const discordReducer=(state=initialState,action)=>{
     
    switch(action.type){
        
        case 'USER_INFO':
            return{
                user:action.payload                
            }
        case 'USER_LOGOUT':{
            return{
                user:null
            }
        }
        
        default:return state;
    }
}