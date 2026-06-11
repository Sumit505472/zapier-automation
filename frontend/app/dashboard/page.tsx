"use client"
import { Appbar } from "@/components/Appbar";
import { DarkButton } from "@/components/buttons/DarkButton";
import {useState,useEffect} from 'react'
import { BACKEND_URL } from "../config";
import axios from 'axios'
import {ZapTable} from "@/components/ZapTable"
import { useRouter } from "next/navigation";
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
        "name": string
      }
    }[],
    "trigger":{
        "id":string,
        "zapId":string,
        "triggerId":string,
        "type":{
            "id":string,
            "name":string
        }
    }
  
}
function useZaps(){
    const [loading,setLoading]=useState(true);
    const [zaps,setZaps]=useState<Zap[]>([]);
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/zap`,{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        })
        .then(res => {
                

            setZaps(res.data);
            setLoading(false);
        })
        .catch(err => {
            
            setLoading(false);
        });

    },[]); 
    return {
        loading,zaps
    } 
}
export default function () {
    const {loading,zaps}=useZaps();
    const router=useRouter();
    
    return <div>
        <Appbar />
        <div className=" flex justify-center pt-8 ">
            <div className=" max-w-5xl w-full ">
                <div className="flex justify-between pr-8 ">

                    
                        <div className="text-2xl font-bold  ">
                            My Zaps

                        </div>

                        <DarkButton onClick={() => {
                            router.push('/zap/create');

                        }}>Create</DarkButton>
                    </div>
                </div>
            </div>
            <div className="flex justify-center ">
                { loading ?"Loading..." : <div className="flex justify-center max-w-5xl w-full">
                    <ZapTable zaps={zaps}/></div> }
               
            </div>
        </div>
        
        
  
}