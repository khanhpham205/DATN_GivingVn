/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Link from "next/link"
export default function Header(){
    return <nav className="gridsys">
        <Link href='/' >Home</Link>
        <div className="">danh muc</div>
        <div className="">search</div>
        <Link href='/account' className="">register</Link>
    </nav>
}