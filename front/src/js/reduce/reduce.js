export default (state={
    Credit:{},
    
},action)=>{
    // console.log(state);
    // return state
    switch(action.type){
        case "STEP1":
        var newstate={}
        state.step1=action.data;
        Object.assign(newstate,state);
        return newstate;
        default:
        return state
        break;
        
    }
    
}