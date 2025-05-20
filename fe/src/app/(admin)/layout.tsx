/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useEffect, useState } from "react";
import { useAuth } from "@/Authcontext";
import { useRouter } from "next/navigation";
import Loading  from "@/components/loadingPage";
import AdminSideBar  from "./adminSideBar";


const roleWhiteList = [
    "adminlvl1_Bac",
    "adminlvl1_Trung",
    "adminlvl1_Nam", 
    "admin"
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { isadmin, checkuser } = useAuth()
    const router = useRouter()
    const [loading,setloading] = useState<boolean>(true)

    const Mount = async()=>{
        
    }
    // console.log(isadmin);
    
    useEffect(()=>{
        setloading(true)
        if(isadmin!=undefined && !roleWhiteList.includes(String( isadmin))){
            router.push('/')
        }
        setTimeout(()=>{
            setloading(false)
        },2000)

    },[isadmin])

    return (
        <div className="gap-3 p-3 h-screen w-full flex flex-1 bg-black overflow-hidden text-white ">
            {(loading)?
            <Loading/>:
            <>
                <AdminSideBar />
                <div className="flex-1">
                    {children}
                </div>
            </>
            }
        </div>
    );
}