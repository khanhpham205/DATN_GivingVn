/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Link from "next/link"
import { useAuth } from "@/Authcontext";
import Image from "next/image";
import './style/header.css'
import { use } from "react";
import { Wallet } from "lucide-react";

export default function Header(){
    const {user} = useAuth()

    return <nav id='usernav' className="gridsys select-text">
        <Link href='/' style={{gridColumn:'span 2',overflow:'hidden'}} >
            <img src="/GivingVn.png" alt="Home" />
        </Link>
        <Link href='/admin'>admin</Link>

        {(!user)?
            <Link href='/account'
                className='
                    text-black flex justify-center items-center w-full h-full
                    col-start-6 
                    lg:col-start-11 lg:col-end-13
                '
            >Register</Link>
        :
            <>
                <Link href='/account'
                    // id='nav_register'
                    className='
                        flex justify-center items-center w-full h-full
                        col-start-5  
                        lg:col-start-11
                    '
                >
                    <Image 
                        className='
                            aspect-square
                            rounded-full
                            w-[50%]
                            lg:w-[70%]
                        '
                        width={300} height={300} alt="" 
                        src={user.avatar?`${user.avatar}`:'/user.png'} 
                    />
                </Link>

                <Wallet 
                    className='w-full lg:col-start-12 cursor-pointer'
                />
            </>
        }
        

    </nav>
}