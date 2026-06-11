import { HOOK_URL } from "@/app/config"
import { LinkButton } from "./buttons/LinkButton"
import { useRouter } from "next/navigation" 
import { imageConfigDefault } from "next/dist/shared/lib/image-config"
interface Zap {
  "id": string,
  "triggerId": string,
  "userId": number,
  "actions": 
    {
      "id": string,
      "zapId": string,
      "actionId": string,
      "sortingOrder": number,
      "type": {
        "id": string,
        "name": string,
        "image":string
      }
    }[],
    "trigger":{
        "id":string,
        "zapId":string,
        "triggerId":string,
        "type":{
            "id":string,
            "name":string,
            "image":string
        }
    }
  
}
export const ZapTable=({zaps}:
    {zaps:Zap[]}
)=>{
  
    const router=useRouter();
    return <div className="p-8  w-full">
        <div className="flex bg-slate-100 ">
  
     
      <div className="flex-1 font-bold">Name</div>
      <div className="flex-1  font-bold">ID </div>
      <div className="flex-1 pr-6 font-bold">Created at</div>
      <div className="flex-1 flex justify-center font-bold">Webhook URL</div>

      <div className="flex-1 flex justify-center font-bold">Go</div>
    
  </div>
    {zaps.map(z=>
    
    <div className="flex border-b border-t py-4  ">
        <div className="flex-1 flex  ">{<img src={z.trigger.type.image} alt={z.trigger.type.name} className="w-7.5 h-7.5 pr-2"/>} {z.actions.map(x=>
          <img src={x.type.image} alt={x.type.name} className="w-7.5 h-7.5" />
          )} </div>
        <div className="flex-1 px-2">{z.id} </div>
        <div className="flex-1 flex justify-center">Nov 13,2023</div>
        <div className="flex-1 flex justify-center">{`${HOOK_URL}/${z.id}`} </div>

        
        <div className="flex-1 flex justify-center"><LinkButton onClick={()=>{
            router.push("/zap/"+z.id)

        }}> GO</LinkButton> </div>
    </div>)}
  </div>

   


}