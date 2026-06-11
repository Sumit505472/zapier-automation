
import {ReactNode} from "react";
export const LinkButton=({children,onClick}:{children:ReactNode,onClick:()=>void})=>{
    return <div
  className="px-2 py-1 cursor-pointer hover:bg-[#EDE7E1] transition-colors duration-200 font-light text-base"
  onClick={onClick}
>
  {children}
</div>

}

  