"use client"

import { Appbar } from "@/components/Appbar"
import { CheckFeature } from "@/components/CheckFeatures"
import { Input } from "@/components/Input"
import { PrimaryButton } from "@/components/buttons/PrimaryButtons"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BACKEND_URL } from "../config"
import axios from 'axios'
export default function () {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    return <div>
        <Appbar />
        <div className="flex justify-center ">
            <div className="flex  pt-8 max-w-4xl ">
                <div className="flex-1 pt-20 px-4 ">
                    <div className="font-normal  text-3xl px-4 pb-4">
                        Join millions worldwide who automate their work using Zapier.
                    </div>
                    <div className="pb-6 pt-4">

                        <CheckFeature label={"Easy setup, no coding required"} />
                    </div>
                    <div className="pb-6">

                        <CheckFeature label={"Free forever for core features"}></CheckFeature>
                    </div>


                    <CheckFeature label={"14-day trial of all premium features and apps"}></CheckFeature>


                </div>
                <div className="flex-1 pt-12 mt-13 pb-6 px-4 border border-red-100">

                    <Input label={"Name"} onChange={e => {
                        setName(e.target.value)

                    }} type="text" placeholder="Your Name"></Input>
                    <Input label={"Email"} onChange={e => {
                        setEmail(e.target.value)
                    }} type="text" placeholder="Your Email"></Input>
                    <Input label={"Password"} onChange={e => {
                        setPassword(e.target.value)
                    }} type="password" placeholder="Password"></Input>


                    <div className="pt-8 text-center pb-">

                        <PrimaryButton onClick={async () => {
                            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                                username: email,
                                password,
                                name
                            });
                            router.push("/login")

                        }} size="big"> Get Started Free</PrimaryButton>
                    </div>
                    <div className="flex justify-center pt-2 ">
                        <div className="">Already have an account?</div>
                        <div className="pl-3">
                            <button className="text-blue-400  hover:underline underline-offset-2 " onClick={() => {
                                router.push('/login')
                            }}>Login</button>
                        </div>
                    </div> 

                </div>

            </div>
        </div>
    </div>
}