/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Link from "next/link"
import { useAuth } from "@/Authcontext";
import Image from "next/image";
import './style/header.css'
import { use } from "react";

export default function Header(){
    const {user} = useAuth()

    return <nav className="gridsys">
        <Link href='/' style={{gridColumn:'span 2',overflow:'hidden'}} >
            <img src="/GivingVn.png" alt="Home" />
        </Link>
        <div className="">Danh mục</div>
        <div className="">Chiến dịch</div>
        <div className="">search</div>
        <Link href='/admin'>admin</Link>
        <Link href='/account' id='nav_register'>
            {(!user)?"Register":
                <Image 
                    src={user.avatar?`${user.avatar}`:'/user.png'} 
                    width={300} height={300} alt="" 
                    
                />
            }
        </Link>

    </nav>
}