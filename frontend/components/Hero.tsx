"use client"
import { useRouter } from "next/navigation"
import { PrimaryButton } from "./buttons/PrimaryButtons"
import { SecondaryButton } from "./buttons/SecondaryButtons"
import { Feature } from "./Features"

export const Hero = () => {
    const router=useRouter();
    return <div>

        <div className=" p-3 pt-10 text-1xl text-center font-thin " > AI automation, governed</div>
        <h1 className=" p-3 text-center font-medium text-4xl ">Your tools. Your rules. Any AI.</h1>
        <div className="text-center pt-3 pb-3">
            <p>Zapier gives teams one place to set guardrails,
                manage model access, and see everything
                — so everyone can</p>
            <p> build with AI confidently, on any model, without waiting for permission.</p>

            <div className=" mt-5 flex  justify-center space-x-4">

                <PrimaryButton onClick={() => {
                    router.push('/signup')
                 }} size="big"  >Get Started Free</PrimaryButton>

                <SecondaryButton onClick={() => { }} size="big">Get Started</SecondaryButton>
            </div>
        </div>
        <div className="flex justify-center">
            <Feature
                title={"Free Forever"}
                subtitle={"for core features"}
            />

            <Feature
                title={"More apps"}
                subtitle={"than any other platforms"}
            />

            <Feature
                title={"Cutting Edge"}
                subtitle={"AI Features"}
            />
        </div>
    </div>
}