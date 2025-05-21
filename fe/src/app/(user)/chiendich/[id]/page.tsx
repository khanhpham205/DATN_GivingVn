/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import axios from "axios";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import { ChevronDown, ChevronUp } from "lucide-react";
import Loading from "@/components/loadingPage";
import VNInput from "@/components/VNCurrencyInput";



const formatVND = (value: number) => value.toLocaleString('vi-VN') + ' VND';

const STEP = 10000;

interface Prop{
    params: Promise<{ id: string }>
}
export default function Chiendichdetail({ params }: Prop) {
    const id = use(params).id;
    
    const [loaded, setloaded] = useState<boolean>(false);

    const [chiendich,setChiendich] = useState<M_chien_dich>();
    const [amount, setAmount] = useState<number>(0)


    const Mount=async()=>{
        const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chiendich/${id}`);
        console.log(data.data);
        
        setChiendich(data.data);
        setloaded(true)
    }

    useEffect(() => {
        Mount() 
    }, []);



    const donate = async () => {
        const jwt = localStorage.getItem('JWT');
        const fe = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/donation/donate/${id}`, 
            {
                amount,
                content: "thanh toan",
            },
            {
                headers:{
                    'authorization': `Bearer ${ jwt }`,
                }
            }
        )

        window.location.href = fe.data;
    }

    return (<>
        {loaded && chiendich ? 
            <div className="gridsys mt-3">
                <img 
                    className=" col-span-6 border-1 border-gray-200 bg-gray-200 rounded w-full object-cover aspect-square"
                    src={chiendich.thumbnail} 
                    alt="asd" 
                />
                <div className="h-full col-span-6 flex flex-col items-start justify-between">

                    {/* thong tin chung */}
                    <div className="flex flex-col gap-2 w-full items-start  ">
                        <h3>{chiendich.name}</h3>

                        <h4 className='w-full border-b-1'>Mô tả dự án</h4>
                        <p>{chiendich.desc}</p>
                    </div>
                    
                    {/* thong tin chi tiet du an */}
                    <div 
                        className="w-full flex flex-col gap-2"
                    >
                        <div className="w-full flex flex-col p-6 items-start gap-2 items-center rounded bg-gray-200 ">

                            {/* thong tin nha tu thien */}
                            <div 
                                className="flex w-full flex-row items-center gap-3"
                            >
                                <Image 
                                    className="rounded-full w-15 border " 
                                    width={300} height={300} 
                                    src={`${chiendich?.author.avatar}`} alt="anh"
                                /> 
                                <h5>{chiendich?.author.name}</h5>
                            </div>


                            <div className=" w-full flex justify-between">
                                <p>Mục tiêu chiến dịch: </p>
                                <p className="text-red-400 underline-offset-1">{formatVND(chiendich.target)}</p>
                            </div>
                            
                            {/* process bar */}
                            <div className="flex relative h-4 rounded-full overflow-hidden w-full  bg-gray-500 ">
                                
                                {/* user donation bar */}
                                <div 
                                    className="absolute h-full bg-gray-400 rounded-full z-0"
                                    style={{ 
                                        width:`${Math.round(((amount + chiendich.current )/ chiendich.target)*100)}%`   
                                    }}
                                ></div>
                                {/* main bar */}
                                <div 
                                    className="h-full bg-blue-500 rounded-full z-1"
                                    style={{ width: `${Math.round((chiendich.current / chiendich.target) * 100)}%` }}
                                >
                                </div>
                                <p className='pl-1 text-xs  text-white z-1'>
                                    {Math.round((chiendich.current / chiendich.target) * 100)}%
                                </p>

                                
                                
                                
                            </div>

                            <div className=" w-full flex justify-between">
                                <p>Đã đạt được: </p>
                                <p className="text-red-400 underline-offset-1">{formatVND(chiendich.current)}</p>
                            </div>
                            
                            

                        </div>

                        {/* chuc nang tu thien */}
                        <div className="w-full flex flex-row items-start gap-2">
                            <VNInput
                                onChange = {(_: string, num: number) => setAmount(num)}
                                value = {amount ? amount.toLocaleString("vi-VN") : ""}
                                min = {10000}
                                max = {chiendich.target - chiendich.current}
                            />
                            <Button variant="contained" onClick={donate}>Ủng hộ</Button>
                        </div>
                        {amount + chiendich.current}
                        /
                        {chiendich.target}
                    </div>


                </div>
                
            </div>
        :<Loading/>}
    </>);
}