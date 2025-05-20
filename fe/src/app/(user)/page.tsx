/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { use, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Banner from "@/components/Banner";
import Card from "@/components/card";
import axios from "axios";
import Link from "next/link";

export default function Home() {
    const [ data, setData ] = useState<M_chien_dich[]>([]);

    const Mount=async() => {
        const a = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chiendich/`);
        setData(a.data);    
    }
    useEffect(() => {
        Mount()
    }, []);

    


    return (<>
        <Banner />
        <div className="gridsys mt-4">
            <div className='fullcol border-b flex justify-between items-center'>
                <h3>Chiến dịch đang hoạt động</h3>
                <Link className="text-black no-underline transition-transform duration-300 hover:scale-120" href='./chiendich'> Xem thêm &rarr;</Link>
            </div>


            {data.map((item, index) => {
                if(index >= 8) return;
                return (<Card key={index} item={item}></Card>);
            })  
            }


        </div>
        <div className="mt-5 h-100">1</div>
    </>);
}
