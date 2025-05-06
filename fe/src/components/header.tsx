/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Link from "next/link"
export default function Header(){
    return <nav className="gridsys">
        <Link href='/' style={{gridColumn:'span 2',overflow:'hidden'}} >
            <img src="/GivingVn.png" alt="Home" />
        </Link>
        <div className="">Danh mục</div>
        <div className="">Chiến dịch</div>
        <div className="">search</div>
        <Link href='/account' className="">register</Link>
    </nav>
}