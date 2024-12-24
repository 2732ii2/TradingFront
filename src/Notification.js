import { useSelector } from "react-redux"


const Notification=({states,hide,sethide})=>{
   const select=useSelector(state=>state);
   const{msg}=select;
    return <div>

{((msg && hide ) && states==1) ?<p className="w-[100%] text-[16px] relative mb-2 text-end  px-5 pr-[40px] py-5 bg-[red] text-white">
        {msg}
        <div onClick={()=>{
          alert("done")
          sethide(false)
        }} className="absolute cursor-pointer -top-[5px] -right-[5px]  w-[20px] h-[20px] rounded-[20px] bg-[white]  text-black flex items-center justify-center ">x</div>
      </p>:null}
    </div>
}

export default Notification