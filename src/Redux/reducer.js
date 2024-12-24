
const initialstate={
    settlementArr:[],
    msg:""
}
const reducer=(state=initialstate,action)=>{
    if(action.type=="addelement"){
        const {settlementArr}=initialstate;
        settlementArr.push(action.data);
        return {...state, settlementArr }
    }
     else  if(action.type=="setmesssage"){
           console.log(action);
          return {...state, msg:action.data }
        }
    else
    return state;
}

export default reducer;