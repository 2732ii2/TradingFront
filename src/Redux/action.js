
const AddElement=(data)=>{
    return {
        type:"addelement",
        data
    }
}

const Setmsg=(data)=>{
    return {
        type:"setmesssage",
        data
    }
}

export  {AddElement,Setmsg};