/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */


import Image from 'next/image';
import './style/Card.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';


interface Prop{ 
    item: M_chien_dich
}



export default function Card( {item} : Prop) {
    const img = process.env.NEXT_PUBLIC_API_URL + item.thumbnail;
    const current = item.current.toLocaleString('vi', {style : 'currency', currency : 'VND'});
    const target = item.target.toLocaleString('vi', {style : 'currency', currency : 'VND'});
    const bar = Math.round((item.current / item.target)*100);


    
    return (
        // card cho gridsystem 12cols trong global.css
        <Link href={`/chiendich/${item._id}`}  className="card relative overflow-hidden border-0">
            <img className='rounded-lg ' src={img} alt="thumnailcard" />
            
            {/* thong tin nha tu thien */}
            <div className="relative h-10 flex  items-end">

                <div className="w-15 absolute top-0 -translate-y-1/2 left-4  flex items-end gap-2 ">
                    <Image 
                        className="rounded-full w-15 border "
                        width={300} height={300} 
                        src={item.author.avatar} alt="anh"
                    /> 
                </div>
                <div className="pl-20 "></div>
                <h5 >{item.author.name}</h5>
            </div>

            {/* process bar & info */}
            <div className=" mt-1 flex flex-col pb-3 ">
                <h5 className="mt-2">{item.name}</h5>

                {/* process */}
                <div className="relative h-4 bg-gray-200 rounded-full flex overflow-hidden">
                    <div 
                        className={`h-full min-w-1 bg-blue-500 rounded-full z-0`}
                        style={{ width: `${bar}%` }}
                    >
                    </div>
                    <p className=' pl-1 items-center text-xs z-1 '>{bar}%</p>

                </div>
                <div className="info flex justify-between">
                    {/* current */}
                    <p>{current}</p>
                    {/* target */}
                    <p className="cost">{target}</p>
                </div>
            </div>
        </Link>
    );
}