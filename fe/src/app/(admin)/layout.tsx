/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useEffect, useState } from "react";
import { useAuth } from "@/Authcontext";
import { useRouter } from "next/navigation";
import Loading  from "@/components/loadingPage";

const roleWhiteList = [
    'admin',
    'adminlvl1'
]


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const {isadmin} = useAuth()
    const router = useRouter()
    const [loading,setloading] = useState<boolean>(true)


    useEffect(()=>{
        setloading(true)
        console.log(isadmin);
        if(!roleWhiteList.includes(String(isadmin))){
            router.push('/')
        }
        setTimeout(()=>{
            setloading(false)
        },2000)
    },[])

    return (
        <div 
            className="min-h-screen w-full bg-stone-300 overflow-hidden text-black "
        >
            {(loading)?<Loading/>:<>{children}</>}
            
            
        </div>
    );
}