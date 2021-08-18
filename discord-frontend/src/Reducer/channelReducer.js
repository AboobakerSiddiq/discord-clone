const initialState={
    channelId:null,
    channelName:null
    
}
export const channelReducer=(state=initialState,action)=>{
     
    switch(action.type){
        
        case 'SET_CHANNEL':
            return{
                channelId:action.payload.channelId,
                channelName: action.payload.channelName               
            }
        
        
        default:return state;
    }
}