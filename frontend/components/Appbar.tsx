"use client";
import { LinkButton } from "./buttons/LinkButton";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "./buttons/PrimaryButtons";

export const Appbar=()=>{
    const router=useRouter();
    return <div className="flex border-b justify-between p-2  ">
        <div className="flex flex-col justify-center pl-2 font-extrabold text-2xl">   
            Zapier
        </div>
         < div className="flex">
         <div className="pr-4">
            
         <LinkButton onClick={()=>{
            router.push('/features')
         }}>
            Contact Sales
         </LinkButton>
         </div>

          <div className="pr-4">

            <LinkButton onClick={()=>{
                router.push('/login')
            }}>
                Login
            </LinkButton>
          </div>

         
           <div className="pr-2 "></div>
        
         <PrimaryButton onClick={()=>{
            router.push('/signup')
         }}>Signup

         </PrimaryButton>


         

         </div>






    </div>
}